import { Provider } from "../src/core";
import { Router } from "../src/api";

import express from "express";
import { json, urlencoded } from "body-parser";

@Provider({ binds: express() })
export class ServerProvider {
  connection;
  use;
  disable;
  listen;
  get;

  constructor() {
    this.use(json({ limit: "50mb" }));
    this.use(urlencoded({ limit: "50mb", extended: true }));
  }

  init(config: any = {}) {
    this.connection = this.listen(config.port, () => {
      console.info(`Api running at ::${config.port}.`);
    });

    this.get("/documentation", (req, res) => {
      const data = Router.metadata.getAll();

      res.send(data);
    });
  }
}
