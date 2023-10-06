import { Component } from "../src/core";
import { Router } from "../src/api";
import { Get, Post, Put, Delete } from "../src/api/router";

const MidCheck = (input) => (req, res, next) => {
  console.log(input);
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
  @Get({ path: "/", middlewares: [MidCheck("Get 1")] })
  async GetList(request, response) {
    try {
      const to_date = request.query.to_date;
      const name = request.query.name;
      const validation = request.query.validation;
      const qtd = request.query.qtd;

      response.json({ to_date, name, validation, qtd });
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
