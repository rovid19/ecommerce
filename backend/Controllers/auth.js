import jwt from "jsonwebtoken";
import User from "../Models/user.js";
import bcryptjs from "bcryptjs";
import { Store } from "../Models/store.js";

const bcryptSalt = bcryptjs.genSaltSync(10);
const jwtSecret = "rockjefakatludirock";

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  const existingUsername = await User.findOne({ username: username });

  if (existingUser) {
    res.status(400).json("Email already in use");
  } else {
    if (existingUsername) {
      res.status(400).json("Username already in use");
    } else {
      const newStore = await Store.create({
        storeName: username,
        storeDescription: "",
        storeProfile:
          "https://gymtok-photo-video-upload.s3.amazonaws.com/1689844678127.png",
        storeCover: "",
        storeAddress: "",
      });
      if (newStore) {
        const newUser = await User.create({
          email,
          username: username,
          password: bcryptjs.hashSync(password, bcryptSalt),
          store: newStore._id,
          profilePicture:
            "https://gymtok-photo-video-upload.s3.amazonaws.com/1689844678127.png",
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
    const checkPass = bcryptjs.compareSync(password, user.password);

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

export const logoutUser = (req, res) => {
  res.cookie("token", "").json("done");
};
