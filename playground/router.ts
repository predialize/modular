import { Component } from "../src/core";
import { Router } from "../src/api";
import { Get } from "../src/api/router";
@Component({
  resolves: Router.component(),
})
export class AppRouter {
  @Get("/")
  async getAll(request, response) {
    try {
      response.json({ event: "getAll" });
    } catch (ex) {
      response.status(500).send(ex);
    }
  }
}
