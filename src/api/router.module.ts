import { Router as ExpRouter } from "express";
import RouteMetadata from "./router.metadata";

var parseRequestQuery = (query) => {
  try {
    var parseTraverse = (query) => {
      return Object.keys(query).reduce((prev, key) => {
        const hasArrayInString = query[key] && query[key][0] == "[";
        const hasObjectInString = query[key] && query[key][0] == "{";

        var value =
          hasArrayInString || hasObjectInString
            ? JSON.parse(query[key])
            : query[key];

        var parseWhenObjectShouldBeArray = (item) => {
          const childKeys = Object.keys(item);

          const isFalseArray = (child) =>
            child instanceof Object &&
            !(child instanceof Array) &&
            Object.keys(child).some((attr) => attr === "0" || attr === "[0]");

          return childKeys.reduce((prev, childKey) => {
            if (isFalseArray(item[childKey])) {
              const val = {
                [childKey]: Object.keys(item[childKey]).reduce(
                  (p, c) => p.concat(item[childKey][c]),
                  []
                ),
              };

              return Object.assign({}, prev, val);
            }

            return Object.assign({}, prev, { [childKey]: item[childKey] });
          }, {});
        };

        const isValidDateStr = (str) => {
          if (!str) return;
          if (typeof str !== "string") return;

          const partials = str.split("-");

          if (partials.length !== 3) return;

          const validate = (val, cb) =>
            !isNaN(Number(val)) && Number(val) > 0 && cb(val.length);

          const isValidYear = validate(partials[0], (length) => length === 4);

          const isValidMonth = validate(
            partials[1],
            (length) =>
              Number(partials[1]) <= 12 && (length === 2 || length === 1)
          );

          const isValidDay = validate(
            partials[2],
            (length) =>
              Number(partials[2]) <= 31 && (length === 2 || length === 1)
          );

          return isValidYear && isValidMonth && isValidDay;
        };

        const parseToDate = (str) => {
          const [year, month, day] = str.split("-");

          return new Date(Number(year), Number(month) - 1, Number(day));
        };

        const data = (() => {
          if (typeof value === "object") {
            if (value instanceof Array) {
              const arrVal = value.map((val) =>
                typeof val === "object" ? parseTraverse(val) : val
              );

              return { [key]: arrVal };
            } else {
              const val = parseWhenObjectShouldBeArray(value);

              return { [key]: parseTraverse(val) };
            }
          } else if (!isNaN(Number(value))) {
            return { [key]: Number(value) };
          } else if (["true", "false"].includes(value)) {
            return { [key]: value === "true" };
          } else if (isValidDateStr(value)) {
            return { [key]: parseToDate(value) };
          } else {
            return { [key]: value === "null" ? null : value };
          }
        })();

        return Object.assign({}, prev, data);
      }, {});
    };

    return parseTraverse(query);
  } catch (ex) {
    console.log("Router Module Exception - parseRequestQuery");
    console.log(ex);
  }
};

class RouterModuleResolver {
  constructor(routes) {
    this.build(routes);
  }

  mergeConfig(crr, prev) {
    if (!crr.children || crr.resolver) return crr;

    crr.middlewares = [].concat(crr.middlewares, prev.middlewares);
    crr.path += prev.path;

    return crr;
  }

  resolve(Route, children, parentRoute) {
    const defaultMiddleware = (req, res, next) => {
      const locals = req.headers.locals ? JSON.parse(req.headers.locals) : null;
      const params = req.headers.params ? JSON.parse(req.headers.params) : null;

      if (locals) {
        req.locals = Object.assign({}, req.locals, locals);
      }

      if (params) {
        req.params = Object.assign({}, req.params, params);
      }

      if (req.query) {
        req.query = parseRequestQuery(req.query);
      }

      next();
    };

    const middlewares = [].concat(defaultMiddleware, Route.middlewares || []);

    return (router) => {
      router.use(
        Route.path || "/",
        middlewares,
        (() => {
          const rootRouter = ExpRouter({ mergeParams: true });

          children?.forEach((child) => {
            child && child(rootRouter, parentRoute);
          });

          return rootRouter;
        })()
      );
    };
  }

  getResolver(Route) {
    return Route.resolver ? new Route.resolver() : new Route();
  }

  build(routes, parentRoute = null) {
    return routes.reduce((prev, Route) => {
      const routeMetadata = RouteMetadata.add(Route, parentRoute);

      const children =
        Route.children && this.build(Route.children, routeMetadata);

      if (!Route.resolver) {
        //   if (Route?.path) {
        if (typeof Route === "object") {
          return prev.concat(this.resolve(Route, children, routeMetadata));
        }

        //   console.log(parentRoute);
        //   return prev.concat(this.getResolver);
        //   console.log(this.getResolver(Route));

        //   return this.getResolver(Route);
      }

      const resolver = this.getResolver(Route);

      if (resolver) {
        if (!resolver.listen) {
          return prev.concat(resolver(Route, children, routeMetadata));
        }

        return this.resolve(Route, children, routeMetadata)(resolver);
      }
    }, []);
  }
}

export const RouterModule = (routes) =>
  class {
    constructor() {
      new RouterModuleResolver(routes);
    }
  };
