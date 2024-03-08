import sql from "mssql";

import { sqlConfig } from "../config/sql_config.js";

export const createPackage = async (packagez) => {
  let database = await sql.connect(sqlConfig);

  await database
    .request()
    .input("name", sql.VarChar(100), packagez.name)
    .input("code", sql.VarChar(50), packagez.code)
    .execute("createPackage");
};

export async function packageNameAlreadyExists(name) {
  let database = await sql.connect(sqlConfig);

  let result = await database
    .request()
    .input("name", sql.VarChar(50), name)
    .output("result", sql.Int)
    .execute("packageAlreadyExists");

  if (result["output"]["result"] == 1) {
    return true;
  } else {
    return false;
  }
}

export async function packageCodeAlreadyExists(code) {
  let database = await sql.connect(sqlConfig);

  let result = await database
    .request()
    .input("code", sql.VarChar(50), code)
    .output("result", sql.Int)
    .execute("packageCodeAlreadyExists");

  if (result["output"]["result"] == 1) {
    return true;
  } else {
    return false;
  }
}

export const editPackage = async (packagez) => {
  let database = await sql.connect(sqlConfig);

  await database
    .request()
    .input("id", sql.Int, packagez.id)
    .input("name", sql.VarChar(50), packagez.name)
    .input("code", sql.VarChar(50), packagez.code)
    .execute("editPackage");
};

export const allPackages = async () => {
  let database = await sql.connect(sqlConfig);

  let packages = await database.request().execute("allPackages");

  return packages.recordset.map((packagez) => {
    return {
      id: packagez.id,
      name: packagez.namez,
      code: packagez.code,
    };
  });
};

export const packageDetails = async (id) => {
  let database = await sql.connect(sqlConfig);

  let packagez = await database
    .request()
    .input("id", sql.Int, id)
    .execute("getPackage");

  return {
    id: packagez.recordset[0]["id"],
    name: packagez.recordset[0]["namez"],
    code: packagez.recordset[0]["code"],
  };
};
