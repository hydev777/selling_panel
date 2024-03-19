import { createBill, allBills } from "../services/bills.js";

export const postCreateBill = async (req, res) => {
  let bill = req.body.bill;
  let products = req.body.products;

  try {
    await createBill(bill, products);

    res.status(200).send({ message: "La factura ha sido creada!" });
  } catch ({ name, message }) {
    res.status(500).send({ message: message });
  }
};

export const getBills = async (req, res) => {
  try {
    let bills = await allBills();

    res.status(200).send(bills);
  } catch ({ name, message }) {
    res.status(500).send({ message: message });
  }
};
