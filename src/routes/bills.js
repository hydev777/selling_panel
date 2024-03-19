import express from "express";

import { getBills, postCreateBill } from "../controller/bills.js";

import { authenticateRequest } from "../controller/authentication.js";

const billsRouter = express.Router();

billsRouter.post("/create", authenticateRequest, postCreateBill); // status factura - completado, cancelado o pendiente

billsRouter.get("/index", authenticateRequest, getBills);

export default billsRouter;
