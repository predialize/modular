import { Component } from "../src/core";
import { Router } from "../src/api";
import { Get, Post, Put, Delete } from "../src/api/router";

const GetMiddleware = (req, res, next) => {
  console.log(req.route_metadata);

  next();
};

const GetListMeta = {
  name: "GetList",
  description: "Get all the example's list",
  version: "1.0",
  params: {
    _id: "this is the items _id",
    name: "this is the items name",
  },
  example: "qualquer exemplo que voce quiser",
  return: "[{ _id: '1231231', name: 'Nuno'}]",
};
@Component({
  resolves: Router.component(),
})
export class AppRouter {
  @Get("/", GetMiddleware)
  async GetList(request, response) {
    try {
      response.json({ event: "Olá, getAll" });
    } catch (ex) {
      response.status(500).send(ex);
    }
  }

  @Post("/")
  async create(request, response) {
    try {
      response.json({ event: "Olá, create" });
    } catch (ex) {
      response.status(500).send(ex);
    }
  }

  @Put("/:_id")
  async update(request, response) {
    try {
      response.json({ event: request.params._id });
    } catch (ex) {
      response.status(500).send(ex);
    }
  }

  @Delete("/:_id")
  async delete(request, response) {
    try {
      response.json({ event: request.params._id });
    } catch (ex) {
      response.status(500).send(ex);
    }
  }
}
