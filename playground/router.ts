import { Component } from "../src/core";
import { Router } from "../src/api";
import { Get, Post, Put } from "../src/api/router";

const Interceptor = (req, res, next) => {
  console.log(req.route_metadata);

  next();
};

@Component({
  resolves: Router.component("/dogs"),
})
export class AppRouter {
  constructor() {}

  @Get("/", Interceptor)
  async getAll(request, response) {
    try {
      response.json({ event: "getAll" });
    } catch (ex) {
      console.log(ex);
      response.status(500).send(ex);
    }
  }

  @Post({
    path: "/",
    middlewares: [Interceptor],
    metadata: {
      title: "Criar",
      description: "Criar novo registro",
    },
  })
  async create(request, response) {
    try {
      response.json({ event: "create" });
    } catch (ex) {
      console.log(ex);
      response.status(500).send(ex);
    }
  }

  @Put(
    {
      path: "/:_id/item/:item",
      metadata: {
        title: "Atualizar",
        description: "Atualizar registro",
        params: [
          {
            _id: {
              type: "Number",
              description: "The _id of the item requested",
            },
          },
        ],
      },
    },
    Interceptor
  )
  async update(request, response) {
    try {
      response.json({ event: "update" });
    } catch (ex) {
      console.log(ex);
      response.status(500).send(ex);
    }
  }
}
