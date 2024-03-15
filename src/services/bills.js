import sql from "mssql";
import { DateTime } from "luxon";

import { sqlConfig } from "../config/sql_config.js";

export const createBill = async (bill, products) => {
  let database = await sql.connect(sqlConfig);

  const transaction = new sql.Transaction(database);
  transaction.begin(async (err) => {
    const billRequest = new sql.Request(transaction);
    const productRequest = new sql.Request(transaction);

    try {
      let now = DateTime.now().toFormat("YYYY-MM-DD HH:mm:ss");
      let createBill = await billRequest
        .input("userId", sql.Int, bill.userId)
        .input("date", sql.DateTime, now)
        .input("totalAmount", sql.Decimal(18, 0), bill.total)
        .output("billId", sql.Int)
        .execute("createBill");

      let billId = createBill.output.billId;

      console.log(`billId ===========>>> ${billId}`);

      for (
        let productIndex = 0;
        productIndex < products.length;
        productIndex++
      ) {
        console.log(products[productIndex]);
        let addProductToBill = await productRequest
          .input("billId", sql.Int, billId)
          .input("itemId", sql.Int, products[productIndex].packageId)
          .input("price", sql.Decimal(18, 0), products[productIndex].price)
          .execute("addProductToBill");

        console.log(addProductToBill);
      }

      transaction.commit();
    } catch (err) {
      console.log(err);
      await transaction.rollback();
    }
  });
};
