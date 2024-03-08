import {
  createPackage,
  editPackage,
  packageDetails,
  allPackages,
  packageNameAlreadyExists,
  packageCodeAlreadyExists,
} from "../services/packages.js";

export const postCreatePackage = async (req, res) => {
  let packagez = req.body;

  try {
    if (await packageNameAlreadyExists(packagez.name)) {
      res
        .status(422)
        .send({ message: "Este nombre de packaquete ya esta en uso" });
    } else if (await packageCodeAlreadyExists(packagez.code)) {
      res
        .status(422)
        .send({ message: "Este codigo de packaquete ya esta en uso" });
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
    if (await packageNameAlreadyExists(packagez.name)) {
      res
        .status(422)
        .send({ message: "Este nombre de packaquete ya esta en uso" });
    } else if (await packageCodeAlreadyExists(packagez.code)) {
      res
        .status(422)
        .send({ message: "Este codigo de packaquete ya esta en uso" });
    } else {
      await editPackage(packagez);

      res.status(200).send({ message: "El paquete ha sido editado" });
    }
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

export const getPackage = async (req, res) => {
  let id = req.params.id;

  try {
    let packagez = await packageDetails(id);

    res.status(200).send(packagez);
  } catch ({ name, message }) {
    res.status(500).send({ message: message });
  }
};
