import express from "express";
const router = express.Router();

import { login, authenticateRequest } from "../controller/authentication.js";
import {
  postCreateUser,
  postEditUser,
  getUsers,
  getUser,
} from "../controller/users.js";

// Test

router.get("/test", (req, res) => {
  res.json({ Nombre: "Samus campero" });
});

// Authentication

router.post("/login", login);

// User

router.get("/users", authenticateRequest, getUsers);

router.get("/users/:id", authenticateRequest, getUser);

router.post("/users/create", authenticateRequest, postCreateUser);

router.post("/users/edit", authenticateRequest, postEditUser);

// Packages

router.get("/packages", authenticateRequest, () => {});

router.get("/packages/:id", authenticateRequest, () => {});

router.post("/packages/create", authenticateRequest, () => {});

router.post("/packages/:id/edit", authenticateRequest, () => {});

export { router };
