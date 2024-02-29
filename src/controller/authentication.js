import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { loginUser } from "../services/authentication.js";
const __dirname = path.resolve();

dotenv.config();

export const login = async (req, res) => {
  let user = req.body;

  try {
    let result = await loginUser(user);

    if (result["output"]["result"] == 1) {
      let token = generateToken(user);

      res.status(200).send({ token: token });
    } else {
      res
        .status(401)
        .send({ message: "Usuario o contraseña estan incorrectos" });
    }
  } catch (err) {
    console.log(err);
  }
};

export const authenticateRequest = (req, res, next) => {
  let token = req.headers.authorization;
  let privateKey = fs.readFileSync(
    path.resolve(__dirname + "/selling_panel", "../privateKey.key"),
    "utf8"
  );

  if (!token) {
    return res.status(401).json({ message: "No Autorizado" });
  }

  jwt.verify(token, privateKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Token invalido" });
    }

    next();
  });
};

function generateToken(user) {
  let privateKey = fs.readFileSync(
    path.resolve(__dirname + "/selling_panel", "../privateKey.key"),
    "utf8"
  );

  let token = jwt.sign({ username: user.username }, privateKey, {
    algorithm: "RS256",
    expiresIn: "3 days",
  });

  return token;
}