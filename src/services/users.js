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
    .input("priceCategory", sql.Int, user.priceCategory)
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
    .input("priceCategory", sql.Int, user.priceCategory)
    .input("status", sql.VarChar(50), user.status)
    .execute("editUser");
};

export const allUsers = async () => {
  let database = await sql.connect(sqlConfig);

  let result = await database.request().execute("allUsers");

  return result.recordset.map((user) => {
    return {
      id: user.id,
      name: user.name,
      username: user.username,
      role: user.role,
      priceCategory: user.price_category,
    };
  });
};

export const userFormData = async () => {
  let database = await sql.connect(sqlConfig);

  let roles = await database.request().execute("allRoles");
  let priceCategories = await database.request().execute("allPriceCategories");
  let packageTypes = await database.request().execute("allPackageTypes");

  return {
    roles: roles.recordset.map((role) => {
      return {
        id: role.id,
        name: role.name,
      };
    }),
    priceCategories: priceCategories.recordset.map((category) => {
      return {
        id: category.id,
        name: category.name,
      };
    }),
    packageTypes: packageTypes.recordset.map((packageType) => {
      return {
        id: packageType.id,
        name: packageType.name,
      };
    }),
    status: [
      {
        id: 1,
        name: "active",
      },
      {
        id: 2,
        name: "inactive",
      },
    ],
  };
};

export const userDetails = async (userId) => {
  let database = await sql.connect(sqlConfig);

  let result = await database
    .request()
    .input("id", sql.Int, userId)
    .execute("userDetails");

  return {
    id: result.recordset[0]["id"],
    name: result.recordset[0]["name"],
    username: result.recordset[0]["username"],
    role: result.recordset[0]["role"],
    priceCategory: result.recordset[0]["price_category"],
    status: result.recordset[0]["status"],
  };
};
