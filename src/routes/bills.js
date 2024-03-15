import express from "express";

import { postCreateBill } from "../controller/bills.js";

import { authenticateRequest } from "../controller/authentication.js";

const billsRouter = express.Router();

billsRouter.post("/create", authenticateRequest, postCreateBill); // status factura - completado, cancelado o pendiente

export default billsRouter;
