import express from "express";

import {
  postCreateUser,
  postEditUser,
  getUsers,
  getUserDetails,
  getUserFormData,
} from "../controller/users.js";

import { authenticateRequest } from "../controller/authentication.js";

const userRouter = express.Router();

// User

userRouter.get("/index", authenticateRequest, getUsers);

userRouter.get("/:id", authenticateRequest, getUserDetails);

userRouter.post("/create", authenticateRequest, postCreateUser);

userRouter.post("/edit", authenticateRequest, postEditUser);

userRouter.get("/form-data", authenticateRequest, getUserFormData);

export default userRouter;
