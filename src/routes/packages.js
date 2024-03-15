import express from "express";

import {
  getPackages,
  postEditPackage,
  postCreatePackage,
  getPackage,
} from "../controller/packages.js";

import { authenticateRequest } from "../controller/authentication.js";

const packagesRouter = express.Router();

// Packages

packagesRouter.get("/index", authenticateRequest, getPackages);

packagesRouter.get("/:id", authenticateRequest, getPackage);

packagesRouter.post("/create", authenticateRequest, postCreatePackage);

packagesRouter.post("/edit", authenticateRequest, postEditPackage);

export default packagesRouter;
