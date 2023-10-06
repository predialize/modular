import { Bootstrap } from "../src/core";
import { Router } from "../src/api";

import { ServerProvider } from "./server.provider";
import { AppRouter } from "./router";

const apiMetadata = {
  name: "pets",
  greetings: "Olá, você está na api de Pets.",
  description: "Esta é uma api para quem quiser visualizar os pets do brab0",
  version: "V1",
};

const RouterModule = Router.module([
  {
    resolver: ServerProvider,
    metadata: apiMetadata,
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
