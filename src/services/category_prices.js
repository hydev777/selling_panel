import sql from "mssql";

import { sqlConfig } from "../config/sql_config.js";

export const createCategoryPrices = async (catPrice) => {
  let database = await sql.connect(sqlConfig);

  await database
    .request()
    .input("packageId", sql.Int, catPrice.packageId)
    .input("priceCategoryId", sql.Int, catPrice.priceCategoryId)
    .input("packageTypeId", sql.Int, catPrice.packageTypeId)
    .input(
      "techResidentialPrice",
      sql.Decimal(18, 0),
      catPrice.techResidentialPrice
    )
    .input(
      "techCommercialPrice",
      sql.Decimal(18, 0),
      catPrice.techCommercialPrice
    )
    .input(
      "admResidentialPrice",
      sql.Decimal(18, 0),
      catPrice.admResidentialPrice
    )
    .input(
      "admCommercialPrice",
      sql.Decimal(18, 0),
      catPrice.admCommercialPrice
    )
    .execute("createPackageCategoryPrice");
};

export async function packageCategoryPricesAlreadyExists(categoryPrices) {
  let database = await sql.connect(sqlConfig);

  let result = await database
    .request()
    .input("packageId", sql.Int, categoryPrices.packageId)
    .input("priceCategoryId", sql.Int, categoryPrices.priceCategoryId)
    .input("packageTypeId", sql.Int, categoryPrices.packageTypeId)
    .output("result", sql.Int)
    .execute("packageCategoryPriceAlreadyExits");

  if (result["output"]["result"] == 1) {
    return true;
  } else {
    return false;
  }
}

export const editCategoryPrices = async (catPrice) => {
  let database = await sql.connect(sqlConfig);

  await database
    .request()
    .input("packageCategoryPriceId", sql.Int, catPrice.packageCategoryPriceId)
    .input("packageId", sql.Int, catPrice.packageId)
    .input("priceCategoryId", sql.Int, catPrice.priceCategoryId)
    .input("packageTypeId", sql.Int, catPrice.packageTypeId)
    .input(
      "techResidentialPrice",
      sql.Decimal(18, 0),
      catPrice.techResidentialPrice
    )
    .input(
      "techCommercialPrice",
      sql.Decimal(18, 0),
      catPrice.techCommercialPrice
    )
    .input(
      "admResidentialPrice",
      sql.Decimal(18, 0),
      catPrice.admResidentialPrice
    )
    .input(
      "admCommercialPrice",
      sql.Decimal(18, 0),
      catPrice.admCommercialPrice
    )
    .execute("editPackageCategoryPrice");
};

export const categoryPricesByType = async (typeId, user) => {
  let database = await sql.connect(sqlConfig);

  let categoryPricesByType = await database
    .request()
    .input("priceCategoryId", sql.Int, typeId)
    .input("role", sql.VarChar(50), user.role)
    .execute("getPackagesProductsByType");

  return categoryPricesByType.recordset.map((price) => {
    return {
      id: price.id,
      priceCategory: price.price_category,
      packageType: price.package_type,
      packageName: price.package_name,
      packageCode: price.package_code,
      techResidentialPrice: price.tech_residential_price,
      techCommercialPrice: price.tech_commercial_price,
      admResidentialPrice: price.adm_residential_price,
      admCommercialPrice: price.adm_commercial_price,
    };
  });
};

export const categoryPriceByTypeDetail = async (id, user) => {
  let database = await sql.connect(sqlConfig);

  let categoryPricesByTypeDetails = await database
    .request()
    .input("id", sql.Int, id)
    .input("role", sql.VarChar(50), user.role)
    .execute("getPackageCategoryPriceDetails");

  let categoryPricesByDetails = categoryPricesByTypeDetails.recordset[0];

  return {
    id: categoryPricesByDetails.id,
    priceCategory: categoryPricesByDetails.price_category,
    packageType: categoryPricesByDetails.package_type,
    packageName: categoryPricesByDetails.package_name,
    packageCode: categoryPricesByDetails.package_code,
    techResidentialPrice: categoryPricesByDetails.tech_residential_price,
    techCommercialPrice: categoryPricesByDetails.tech_commercial_price,
    admResidentialPrice: categoryPricesByDetails.adm_residential_price,
    admCommercialPrice: categoryPricesByDetails.adm_commercial_price,
  };
};
