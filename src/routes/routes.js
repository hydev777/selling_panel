import express from "express";
const router = express.Router();

import {
  login,
  authenticateRequest,
  authenticateToken,
} from "../controller/authentication.js";

import {
  postCreateUser,
  postEditUser,
  getUsers,
  getUserDetails,
  getUserFormData,
} from "../controller/users.js";

import { getPackages } from "../controller/packages.js";

// Test

router.get("/test", (req, res) => {
  res.json({ nombre: "Samus campero" });
});

// Authentication

router.post("/login", login);

router.get("/authenticate-token", authenticateToken);

// User

router.get("/users", authenticateRequest, getUsers);

router.get("/users/:id", authenticateRequest, getUserDetails);

router.post("/users/create", authenticateRequest, postCreateUser);

router.post("/users/edit", authenticateRequest, postEditUser);

router.get("/form-data", authenticateRequest, getUserFormData);

// Packages

router.get("/packages", authenticateRequest, getPackages);

router.get("/packages/:id", authenticateRequest, () => {});

router.post("/packages/create", authenticateRequest, () => {});

router.post("/packages/:id/edit", authenticateRequest, () => {});

// Packages prices

router.get("/packages-prices/:id", authenticateRequest, () => {});

router.post("/packages-prices/create", authenticateRequest, () => {});

router.post("/packages-prices/:id/edit", authenticateRequest, () => {});

// Bills

router.post("/bills/create", authenticateRequest, () => {});

export { router };
