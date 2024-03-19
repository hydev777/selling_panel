import express from "express";

import {
  postCreateCategoryPrice,
  postEditCategoryPrice,
  getCategoryPricesByType,
  getCategoryPriceByTypeDetails,
} from "../controller/category_prices.js";

import { authenticateRequest } from "../controller/authentication.js";

const packagesPricesRouter = express.Router();

// Packages prices

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

packagesPricesRouter.get(
  "/:id",
  authenticateRequest,
  getCategoryPriceByTypeDetails
);

export default packagesPricesRouter;
