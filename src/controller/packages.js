import {
  createPackage,
  editPackage,
  packageDetails,
  allPackages,
  packageAlreadyExists,
} from "../services/packages.js";

export const postCreatePackage = async (req, res) => {
  let packagez = req.body;

  try {
    if (await packageAlreadyExists(packagez.name)) {
      res
        .status(422)
        .send({ message: "Este nombre de packaquete ya esta en uso" });
    } else {
      await createPackage(packagez);

      res.status(200).send({ message: "El paquete ha sido creado" });
    }
  } catch ({ name, message }) {
    res.status(500).send({ message: message });
  }
};

export const postEditPackage = async (req, res) => {
  let packagez = req.body;

  try {
    await editPackage(packagez);

    res.status(200).send({ message: "El paquete ha sido editado" });
  } catch ({ name, message }) {
    res.status(500).send({ message: message });
  }
};

export const getPackages = async (req, res) => {
  try {
    let packages = await allPackages();

    res.status(200).send(packages);
  } catch ({ name, message }) {
    res.status(500).send({ message: message });
  }
};

export const getpackage = async (req, res) => {};
