import { createProxyMiddleware } from "http-proxy-middleware";
import express from "express";
import cors from "cors";
import { json, urlencoded } from "body-parser";

class Node {
  app;
  host;
  path_rewrite;
  route;
  param;
  middlewares;
  parentNodes;
  children;

  constructor(app, params) {
    this.app = app;
    this.host = params.host;
    this.path_rewrite = params.path_rewrite;
    this.route = params.route;
    this.param = params.param || "";
    this.middlewares = params.middlewares || [(req, res, next) => next()];
    this.parentNodes = params.parentNodes;
    this.children = params.children;
  }

  getFullRoutes() {
    if (this.host) {
      if (this.parentNodes && this.parentNodes.length > 0) {
        return this.parentNodes.map((parentNode) => {
          const parentRoute = parentNode.parentNodes
            ? parentNode.getFullRoutes()
            : [parentNode.route];

          const path = parentNode.param
            ? [parentNode.param, this.route]
            : [this.route];

          return parentRoute.concat(...path).join("/");
        });
      } else {
        return [this.route];
      }
    }
  }

  logger(route) {
    const fullwidth = (str) => {
      const size = 40;
      let rest = [];
      const length = size - str.length;

      rest.length = length > 0 ? length : 0;

      return str + rest.map((r) => "").join(" ");
    };

    const logInfo = () => {
      console.info(`Proxy created: ${fullwidth(route)}  -> ${this.host}`);
    };

    return () => ({
      log: (str) => console.log(str),
      debug: (str) => console.debug(str),
      info: logInfo,
      warn: (str) => console.warn(str),
      error: (str) => console.error(str),
    });
  }

  setProxy() {
    const routes = this.getFullRoutes();

    /** path_rewrite comes from env file and always with a string value and is not always present */
    const getPath = (path, req) => {
      if (this.path_rewrite === "false") {
        return req.url;
      } else {
        const [, ...paths] = req.url.split(this.route);
        return paths.join(this.route);
      }
    }

    routes &&
      routes.forEach((route) => {
        this.app.use(
          route,
          ...this.middlewares,
          createProxyMiddleware({
            target: this.host,
            changeOrigin: true,
            pathRewrite: getPath,
            logProvider: this.logger(route),
          })
        );
      });
  }
}

export default class Gateway {
  private app;
  private options;

  constructor(options) {
    this.app = express();
    this.options = options;
    this.app.use(cors(this.options.cors.exposedHeaders));
  }

  getNode(options) {
    return new Node(this.app, options);
  }

  setProxy(tree) {
    const nodes = this.loadNodes(tree);

    this.useProxy(nodes);
  }

  loadNodes(nodes, parent = null) {
    return nodes.reduce((prev, node) => {
      const middlewares = node.middlewares
        ? {
            middlewares: node.middlewares.concat(
              parent ? parent.middlewares || [] : []
            ),
          }
        : parent && parent.middlewares
        ? { middlewares: parent.middlewares }
        : {};

      const parentNode = parent ? { parentNodes: [parent] } : {};
      
      const currentNode = this.getNode(
        Object.assign({}, node, parentNode, middlewares)
      );

      const child = node.children
        ? this.loadNodes(node.children, currentNode)
        : currentNode;

      return child.route === currentNode.route
        ? prev.concat(child)
        : prev.concat(child, currentNode);
    }, []);
  }

  useProxy(nodes) {
    nodes.forEach((node) => {
      if (node instanceof Node) {
        node.setProxy();
      }
    });
  }

  listen(port, cb) {
    this.app.use(json({ limit: "50mb" }));
    this.app.use(urlencoded({ limit: "50mb", extended: true }));
    this.app.use(cors(this.options.cors.exposedHeaders));
    this.app.disable("x-powered-by");

    this.app.listen(port, cb);
  }
}
