// @ts-nocheck
import sql from "mssql";

import { sqlConfig } from "../config/sql_config.js";

export const createBill = async (bill, products) => {
  let database = await sql.connect(sqlConfig);

  const transaction = new sql.Transaction(database);
  transaction.begin(async (error) => {
    const billRequest = new sql.Request(transaction);
    const productRequest = new sql.Request(transaction);

    if (error) {
    }

    try {
      let createBill = await billRequest
        .input("userId", sql.Int, bill.userId)
        .input("totalAmount", sql.Decimal(18, 0), bill.total)
        .output("billId", sql.Int)
        .execute("createBill");

      let billId = createBill.output.billId;

      for (
        let productIndex = 0;
        productIndex < products.length;
        productIndex++
      ) {
        await productRequest
          .input("billId", sql.Int, billId)
          .input("itemId", sql.Int, products[productIndex].packageId)
          .input("price", sql.Decimal(18, 0), products[productIndex].price)
          .execute("addProductToBill");
      }

      transaction.commit();
    } catch (err) {
      console.log(err);
      await transaction.rollback();
    }
  });
};

export const allBills = async (typeId, user) => {
  let database = await sql.connect(sqlConfig);

  let bills = await database.request().execute("allBills");

  return bills.recordset.map((bills) => {
    return {
      id: bills.id,
      user: {
        id: bills.user_id,
        username: bills.username,
      },
      date: bills.date,
      totalAmount: bills.total_amount,
    };
  });
};
