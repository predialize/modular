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
            : componentArg || [];

          const componentMiddlewares =
            middlewares || componentArg?.middlewares || [];

          const routePath = []
            .concat(moduleArgs?.path || [], componentPath)
            .join("");

          const routeMiddlewares = [].concat(
            moduleArgs?.middlewares || [],
            componentMiddlewares
          );

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
            ...routeMiddlewares,
            (() => {
              const router = ExpRouter({ mergeParams: true });

              Object.values(Target).forEach((method: any) => {
                if (method.descriptor) {
                  const [endpointArg, ...endpointMiddlewares] =
                    method.args || [];

                  const endpointOptions = {
                    endpoint: true,
                    http_method: method.resolver,
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
                    metadataMiddlewareInjector,
                    endpointMiddlewares || [],
                    endpointArg?.middlewares || []
                  );

                  router[method.resolver](
                    endpointDefinition.path,
                    ...middlewares,
                    (req, res, next) => {
                      const params = req.headers.params
                        ? JSON.parse(req.headers.params)
                        : {};

                      const token = req.headers.authorization
                        ? req.headers.authorization.replace("Bearer ", "")
                        : null;

                      req.locals = req.headers.locals
                        ? JSON.parse(req.headers.locals)
                        : {};

                      req.params = Object.assign({}, params, req.params);

                      const dependencies =
                        options && options.injects
                          ? options.injects.map(
                              (Dep) =>
                                new Dep({
                                  params: req.params,
                                  locals: req.locals,
                                  body: req.body,
                                  query: req.query,
                                  token,
                                })
                            )
                          : [];

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
