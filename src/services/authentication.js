import sql from "mssql";

import { sqlConfig } from "../config/sql_config.js";

export const loginUser = async (user) => {
  let database = await sql.connect(sqlConfig);

  console.log(user);

  let result = await database
    .request()
    .input("username", sql.VarChar(50), user.username)
    .input("password", sql.VarChar(100), user.password)
    .output("result", sql.Int)
    .execute("loginUser");

  console.log(result);

  return result;
};

export const userAuthenticated = async (username) => {
  let database = await sql.connect(sqlConfig);

  let result = await database
    .request()
    .input("username", sql.VarChar(50), username)
    .execute("userAthenticated");

  return {
    id: result.recordset[0]["id"],
    name: result.recordset[0]["name"],
    username: result.recordset[0]["username"],
    role: result.recordset[0]["role"],
    priceCategory: result.recordset[0]["price_category"],
  };
};
