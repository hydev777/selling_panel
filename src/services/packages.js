import sql from "mssql";

import { sqlConfig } from "../config/sql_config.js";

export const createPackage = async (packagez) => {
  let database = await sql.connect(sqlConfig);

  await database
    .request()
    .input("name", sql.VarChar(50), packagez.name)
    .input("residentialPrice", sql.Decimal(18, 0), packagez.password)
    .input("commercialPrice", sql.Decimal(18, 0), packagez.name)
    .execute("createPackage");
};

export async function packageAlreadyExists(name) {
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

export const editPackage = async (packagez) => {
  let database = await sql.connect(sqlConfig);

  await database
    .request()
    .input("id", sql.Int, packagez.id)
    .input("name", sql.VarChar(50), packagez.name)
    .input("residentialPrice", sql.Decimal(18, 0), packagez.password)
    .input("commercialPrice", sql.Decimal(18, 0), packagez.name)
    .execute("editPackage");
};

export const allPackages = async () => {
  let database = await sql.connect(sqlConfig);

  let packages = await database.request().execute("allPackages");

  return packages.recordset.map((packagez) => {
    return {
      id: packagez.id,
      name: packagez.namez,
      residentialPrice: packagez.residential_price,
      commercialPrice: packagez.commercial_price,
    };
  });
};

export const packageDetails = async (user) => {};
