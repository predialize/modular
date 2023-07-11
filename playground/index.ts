import { Bootstrap } from "../src/core";
import { Router } from "../src/api";

import { ServerProvider } from "./server.provider";
import { AppRouter } from "./router";

const RouterModule = Router.module([
  {
    resolver: ServerProvider,
    metadata: {
      title: "Pets",
      name: "pets",
      description: "Gatos, cachorros, periquito, papagaio etc...",
    },
    children: [AppRouter],
  },
]);

@Bootstrap({
  provides: [ServerProvider],
  imports: [RouterModule],
})
export class AppModule {
  constructor(private app) {
    this.app.init({ port: 4000 });
  }
}
