import { Router as ExpRouter } from "express";
import RouterMetadata from "./router.metadata";

/** called on import class file */
export const RouterComponent = (...componentArgs) => {
  try {
    /** called by decorator resolves */
    return (Target, config, options, customs, broadcast) => {
      /** called by router.module prepare children */
      return (moduleArgs, children) => {
        /** called by router.module on bind to app */
        return (appRouter, parentDefinition) => {
          const [componentArg, ...middlewares] = componentArgs || [];

          const componentPath = componentArg?.path
            ? componentArg.path
            : typeof componentArg === "string"
            ? componentArg
            : "/";

          const routePath = []
            .concat(moduleArgs?.path || [], componentPath)
            .join("");

          const moduleArg =
            !moduleArgs || moduleArgs instanceof Function
              ? parentDefinition
              : moduleArgs;

          const componentDefinition = RouterMetadata.add(
            componentArg,
            moduleArg
          );

          appRouter.use(
            routePath,
            (() => {
              const router = ExpRouter({ mergeParams: true });

              const componentMiddlewares = componentArg?.middlewares
                ? componentArg.middlewares
                : middlewares || [];

              const routeMiddlewares = moduleArgs?.middlewares || [];

              Object.values(Target).forEach((method: any) => {
                if (method.descriptor) {
                  const [endpointArg, ...endpointMiddlewares] =
                    method.args || [];

                  const endpointOptions = {
                    endpoint: true,
                    http_method: method.resolver,
                    handler: method.propertyKey,
                  };

                  const endpointDefinition = RouterMetadata.add(
                    endpointArg,
                    componentDefinition || moduleArg || parentDefinition,
                    endpointOptions
                  );

                  const metadataMiddlewareInjector = (req, res, next) => {
                    const { parent, ...metadata } = endpointDefinition;

                    req.route_metadata = metadata;

                    next();
                  };

                  const middlewares = [].concat(
                    routeMiddlewares,
                    componentMiddlewares,
                    metadataMiddlewareInjector,
                    endpointMiddlewares || [],
                    endpointArg?.middlewares || []
                  );

                  router[method.resolver](
                    endpointDefinition.path,
                    ...middlewares,
                    (req, res, next) => {
                      const { params, authorization, locals }: any =
                        req?.headers || {};
                      const headerParams = params ? JSON.parse(params) : {};
                      const token = authorization?.replace("Bearer ", "");

                      req.locals = locals ? JSON.parse(locals) : {};
                      req.params = Object.assign({}, headerParams, req.params);

                      const dependencies = (options?.injects || []).map(
                        (Dep) =>
                          new Dep({
                            params: req.params,
                            locals: req.locals,
                            body: req.body,
                            query: req.query,
                            token,
                          })
                      );

                      const instance = new Target(...dependencies);

                      instance[method.propertyKey].apply(instance, [
                        req,
                        res,
                        next,
                      ]);
                    }
                  );
                }
              });

              children && children.forEach((child) => child(router));

              return router;
            })()
          );
        };
      };
    };
  } catch (ex) {
    throw ex;
  }
};
