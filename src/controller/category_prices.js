import { createCategoryPrices } from "../services/category_prices.js";

export const postCreateCategoryPrice = async (req, res) => {
  let categoryPrices = req.body;

  try {
    if (categoryPrices.length > 1) {
      for (let index = 0; index < categoryPrices.length; index++) {
        await createCategoryPrices(categoryPrices[index]);
      }
    } else {
      await createCategoryPrices(categoryPrices[0]);
    }
  } catch ({ name, message }) {
    res.status(500).send({ message: message });
  }
};
