import express from "express";
import cors from "cors";
import process from "process";
import dotenv from "dotenv";

import router from "./routes/routes.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

// @ts-ignore
app.use([
  cors(),
  express.json(),
  express.urlencoded({ extended: false }),
  router,
]);

// @ts-ignore
app.listen(port, () => {
  console.log(`Selling panel listening on port ${port}`);
});
