import {
  createUser,
  editUser,
  userDetails,
  allUsers,
  userAlreadyExists,
  userFormData,
} from "../services/users.js";

export const postCreateUser = async (req, res) => {
  let user = req.body;

  try {
    if (await userAlreadyExists(user.username)) {
      res.status(422).send({ message: "Este usuario ya esta en uso" });
    } else {
      await createUser(user);

      res.status(200).send({ message: "El usuario ha sido creado" });
    }
  } catch ({ name, message }) {
    res.status(500).send({ message: message });
  }
};

export const postEditUser = async (req, res) => {
  let user = req.body;

  try {
    await editUser(user);

    res.status(200).send({ message: "El usuario ha sido editado" });
  } catch ({ name, message }) {
    res.status(500).send({ message: message });
  }
};

export const getUsers = async (req, res) => {
  try {
    let users = await allUsers();

    res.status(200).send(users);
  } catch ({ name, message }) {
    res.status(500).send({ message: message });
  }
};

export const getUserFormData = async (req, res) => {
  try {
    let data = await userFormData();

    res.status(200).send(data);
  } catch ({ name, message }) {
    res.status(500).send({ message: message });
  }
};

export const getUserDetails = async (req, res) => {
  let userId = req.params.id;

  try {
    let result = await userDetails(userId);

    res.status(200).send(result);
  } catch ({ name, message }) {
    res.status(500).send({ message: message });
  }
};
