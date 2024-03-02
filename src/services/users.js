import sql from "mssql";

import { sqlConfig } from "../config/sql_config.js";

export const createUser = async (user) => {
  let database = await sql.connect(sqlConfig);

  await database
    .request()
    .input("username", sql.VarChar(50), user.username)
    .input("password", sql.VarChar(100), user.password)
    .input("name", sql.VarChar(50), user.name)
    .input("role", sql.Int, user.role)
    .execute("createUser");
};

export async function userAlreadyExists(username) {
  let database = await sql.connect(sqlConfig);

  let result = await database
    .request()
    .input("username", sql.VarChar(50), username)
    .output("result", sql.Int)
    .execute("userAlreadyExists");

  if (result["output"]["result"] == 1) {
    return true;
  } else {
    return false;
  }
}

export const editUser = async (user) => {
  let database = await sql.connect(sqlConfig);

  await database
    .request()
    .input("id", sql.Int, user.id)
    .input("username", sql.VarChar(50), user.username)
    .input("name", sql.VarChar(50), user.name)
    .input("role", sql.Int, user.role)
    .execute("editUser");
};

export const allUsers = async () => {
  let database = await sql.connect(sqlConfig);

  let result = await database.request().execute("allUsers");

  return result.recordset.map((user) => {
    return {
      id: user.id,
      name: user.namez,
      username: user.username,
      role: user.rolez,
    };
  });
};

export const userDetails = async (userId) => {
  let database = await sql.connect(sqlConfig);

  let result = await database
    .request()
    .input("id", sql.Int, userId)
    .execute("userDetails");

  return result.recordset[0];
};
