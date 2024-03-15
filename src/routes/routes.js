import express from "express";

import authenticationRouter from "./authentication.js";
import userRouter from "./user.js";
import packagesRouter from "./packages.js";
import packagesPricesRouter from "./packages_prices.js";
import billsRouter from "./bills.js";

const router = express.Router();

router.use("/auth", authenticationRouter);

router.use("/user", userRouter);

router.use("/packages", packagesRouter);

router.use("/packages-prices", packagesPricesRouter);

router.use("/bills", billsRouter);

export default router;
