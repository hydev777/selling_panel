import sql from "mssql";

import { sqlConfig } from "../config/sql_config.js";

export const createCategoryPrices = async (catPrice) => {
  let database = await sql.connect(sqlConfig);

  await database
    .request()
    .input("priceCategory", sql.Int, catPrice.priceCategory)
    .input("package", sql.Int, catPrice.package)
    .input("packageType", sql.Int, catPrice.packageType)
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
