import jwt from "jsonwebtoken";
import User from "../Models/user.js";

const jwtSecret = "rockjefakatludirock";

export const getUser = async (req, res) => {
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, user) => {
      if (err) throw err;
      const userData = await User.findById(user.id);
      console.log("jedan");

      if (userData.role === "Customer") {
      } else {
        const newStore = await User.findById(user.id).populate(
          "store",
          "storeName storeDescription storeProfile storeCover storeProducts storeAddress"
        );
        console.log("dva");

        res.json(newStore);
      }
    });
  }
};
