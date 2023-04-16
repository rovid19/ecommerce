import jwt from "jsonwebtoken";
import User from "../Models/user.js";
import Store from "../Models/store.js";
import Product from "../Models/product.js";
import bcrypt from "bcrypt";

const jwtSecret = "rockjefakatludirock";
const bcryptSalt = bcrypt.genSaltSync(10);

export const setProductToCart = async (req, res) => {
  const { token } = req.cookies;
  const { selectedProduct } = req.body;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const user = await User.findById(userData.id);

    user.addToCart.push(selectedProduct);

    await user.save();

    res.json(user);
  });
};

export const getProductsFromCart = async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const user = await User.findById(userData.id).populate(
      "addToCart",
      "productName productPicture productDescription productRating productNewPrice productOldPrice quantity"
    );

    res.json(user.addToCart);
  });
};

export const removeProductFromCart = async (req, res) => {
  const { token } = req.cookies;
  const { selectedProduct } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const user = await User.findById(userData.id);
    const { addToCart } = user;
    const newAddToCart = addToCart.map((item) => item.toString());
    const index = newAddToCart.findIndex(
      (product) => product === selectedProduct
    );
    newAddToCart.splice(index, 1);

    user.set({
      addToCart: newAddToCart,
    });

    await user.save();

    res.json(user.addToCart);
  });
};

export const profileChanges = async (req, res) => {
  const { token } = req.cookies;
  const { newEmail, newPassword, profilePhoto, newUsername } = req.body;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const user = await User.findById(userData.id);

    if (newEmail) {
      user.set({
        email: newEmail,
      });
    }
    if (newUsername) {
      user.set({
        username: newUsername,
      });
    }
    if (newPassword) {
      user.set({
        password: bcrypt.hashSync(newPassword, bcryptSalt),
      });
    }
    if (profilePhoto) {
      user.set({
        profilePicture: profilePhoto,
      });
    }

    await user.save();

    res.json(user);
  });
};
