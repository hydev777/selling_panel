import {
  createCategoryPrices,
  categoryPricesByType,
  editCategoryPrices,
  packageCategoryPricesAlreadyExists,
  categoryPriceByTypeDetail,
} from "../services/category_prices.js";
import { userInToken } from "./authentication.js";

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
  let token = req.headers.authorization;
  let user = await userInToken(token);

  try {
    let packagePrices = await categoryPricesByType(typeId, user);

    res.status(200).send(packagePrices);
  } catch ({ name, message }) {
    res.status(500).send({ message: message });
  }
};

export const getCategoryPriceByTypeDetails = async (req, res) => {
  let id = req.params.id;
  let token = req.headers.authorization;
  let user = await userInToken(token);

  try {
    let packagePrices = await categoryPriceByTypeDetail(id, user);

    res.status(200).send(packagePrices);
  } catch ({ name, message }) {
    res.status(500).send({ message: message });
  }
};
