import express from "express";

import {
  login,
  authenticateRequest,
  authenticateToken,
} from "../controller/authentication.js";

const authenticationRouter = express.Router();

// Authentication

authenticationRouter.post("/login", login);

authenticationRouter.get("/authenticate-token", authenticateToken);

export default authenticationRouter;
