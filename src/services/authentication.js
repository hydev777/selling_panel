import sql from "mssql";

import { sqlConfig } from "../config/sql_config.js";

export const loginUser = async (user) => {
  let database = await sql.connect(sqlConfig);

  let result = await database
    .request()
    .input("username", sql.VarChar(50), user.username)
    .input("password", sql.VarChar(100), user.password)
    .output("result", sql.Int)
    .execute("loginUser");

  return result;
};
