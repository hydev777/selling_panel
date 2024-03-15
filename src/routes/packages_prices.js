import express from "express";

import {
  postCreateCategoryPrice,
  postEditCategoryPrice,
  getCategoryPricesByType,
} from "../controller/category_prices.js";

import { authenticateRequest } from "../controller/authentication.js";

const packagesPricesRouter = express.Router();

// Packages prices

packagesPricesRouter.get("/:id", authenticateRequest, () => {});

packagesPricesRouter.get(
  "/:typeId/type",
  authenticateRequest,
  getCategoryPricesByType
);

packagesPricesRouter.post(
  "/create",
  authenticateRequest,
  postCreateCategoryPrice
);

packagesPricesRouter.post("/edit", authenticateRequest, postEditCategoryPrice);

export default packagesPricesRouter;
