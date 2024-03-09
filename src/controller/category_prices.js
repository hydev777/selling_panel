import {
  createCategoryPrices,
  categoryPricesByType,
  editCategoryPrices,
  packageCategoryPricesAlreadyExists,
} from "../services/category_prices.js";

export const postCreateCategoryPrice = async (req, res) => {
  let categoryPrices = req.body;

  try {
    if (await packageCategoryPricesAlreadyExists(categoryPrices)) {
      res.status(422).send({ message: "Category price is already in use" });
    } else {
      await createCategoryPrices(categoryPrices);

      res.status(200).send({ message: "Category price created" });
    }
  } catch ({ name, message }) {
    res.status(500).send({ message: message });
  }
};

export const postEditCategoryPrice = async (req, res) => {
  let categoryPrices = req.body;

  try {
    await editCategoryPrices(categoryPrices);

    res.status(200).send({ message: "Category price edited" });
  } catch ({ name, message }) {
    res.status(500).send({ message: message });
  }
};

export const getCategoryPricesByType = async (req, res) => {
  let typeId = req.params.typeId;

  try {
    let packagePrices = await categoryPricesByType(typeId);

    res.status(200).send(packagePrices);
  } catch ({ name, message }) {
    res.status(500).send({ message: message });
  }
};
