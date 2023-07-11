import { RouterModule } from "./router.module";
import { RouterComponent } from "./router.component";
import Gateway from "./gateway";
import RouterMetadata from "./router.metadata";

const Router = {
  module: RouterModule,
  component: RouterComponent,
  metadata: RouterMetadata,
};

export { Router, Gateway };
