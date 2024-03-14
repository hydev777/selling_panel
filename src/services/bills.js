import sql from "mssql";

import { sqlConfig } from "../config/sql_config.js";

export const createBill = async (bill, products) => {
  let database = await sql.connect(sqlConfig);

  const transaction = new sql.Transaction(database);
  transaction.begin(async (err) => {
    // ... error checks

    const request = new sql.Request(transaction);

    await database
      .request()
      .input("userId", sql.VarChar(50), bill.userId)
      .input("date", sql.DateTime, bill.date)
      .input("total", sql.Decimal(18, 0), bill.total)
      .execute("createBill");

    request.query(
      "insert into mytable (mycolumn) values (12345)",
      (err, result) => {
        // ... error checks

        transaction.commit((err) => {
          // ... error checks

          console.log("Transaction committed.");
        });
      }
    );
  });
};
