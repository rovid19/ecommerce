import jwt from "jsonwebtoken";
import User from "../Models/user.js";
import bcrypt from "bcrypt";
import circularJSON from "circular-json";

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "rockjefakatludirock";

export const registerUser = async (req, res) => {
  const { dynamicName, email, password, input } = req.body;
  console.log(input);
  const existingUser = await User.findOne({ email });
  const existingUsername = await User.findOne({ username: dynamicName });
  if (input === "Customer") {
    if (existingUser) {
      res.status(400).json("Email already in use");
    } else {
      if (existingUsername) {
        res.status(400).json("Username already in use");
      } else {
        const newUser = await User.create({
          email,
          username: dynamicName,
          storeName: dynamicName,
          password: bcrypt.hashSync(password, bcryptSalt),
          role: input,
        });

        res.json(newUser);
      }
    }
  } else {
    if (existingUser) {
      res.status(400).json("Email already in use");
    } else {
      if (existingUsername) {
        res.status(400).json("Store name already in use");
      } else {
        const newUser = await User.create({
          email,
          username: dynamicName,
          storeName: dynamicName,
          password: bcrypt.hashSync(password, bcryptSalt),
          role: input,
        });

        res.json(newUser);
      }
    }
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    const checkPass = bcrypt.compareSync(password, user.password);

    if (checkPass) {
      jwt.sign(
        { email: user.email, id: user._id },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res
            .cookie("token", token, { sameSite: "none", secure: true })
            .json(user);
        }
      );
    } else {
      res.status(400).json("Email or password is wrong");
    }
  } else {
    res.status(400).json("Email or password is wrong");
  }
};

export const getUser = async (req, res) => {
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, user) => {
      if (err) throw err;
      const userData = await User.findById(user.id);
      res.json(userData);
    });
  }
};

export const logoutUser = (req, res) => {
  res.cookie("token", "").json("done");
};
