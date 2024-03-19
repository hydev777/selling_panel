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

packagesRouter.post("/create", authenticateRequest, postCreatePackage);

packagesRouter.post("/edit", authenticateRequest, postEditPackage);

packagesRouter.get("/:id", authenticateRequest, getPackage);

export default packagesRouter;
