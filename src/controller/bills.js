import { createBill } from "../services/bills.js";

export const postCreateBill = async (req, res) => {
  let bill = req.body.bill;
  let products = req.body.products;

  console.log(bill, products);

  try {
    await createBill(bill, products);

    res.status(200).send({ message: "La factura ha sido creada!" });
  } catch ({ name, message }) {
    res.status(500).send({ message: message });
  }
};
