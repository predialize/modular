import { Gateway } from "../src/api";

const gateway = new Gateway();

gateway.setProxy([
  {
    children: [
      {
        host: "http://localhost:5000/metadata",
        route: "documentation/order",
      },
    ],
  },
]);

gateway.listen(4000, (app) => {
  console.log(`API Gateway running at 4000`);

  app.get("/documentation", (req, res) => {
    res.send("docs");
  });
});
