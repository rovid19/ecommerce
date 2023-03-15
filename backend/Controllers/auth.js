import jwt from "jsonwebtoken";
import User from "../Models/user.js";
import bcrypt from "bcrypt";

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "rockjefakatludirock";

export const registerUser = async (req, res) => {
  const { dynamicName, email, password } = req.body;

  const newUser = await User.create({
    email,
    username: dynamicName,
    storeName: dynamicName,
    password: bcrypt.hashSync(password, bcryptSalt),
  });

  res.json(newUser);
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.find({ email });

  if (user) {
    checkPass = bcrypt.compareSync(password, user.password);

    if (checkPass) {
      jwt.sign(
        { email: user.email, id: user.id },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res
            .cookie("token", token, { sameSite: "none", secure: true })
            .json(user);
        }
      );
    }
  }
};
