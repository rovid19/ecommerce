import jwt from "jsonwebtoken";
import User from "../Models/user.js";
import Store from "../Models/store.js";

const jwtSecret = "rockjefakatludirock";

export const getUser = async (req, res) => {
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, user) => {
      if (err) throw err;
      const userData = await User.findById(user.id);

      if (userData.role === "Customer") {
      } else {
        const newStore = await User.findById(user.id).populate(
          "store",
          "storeName storeDescription storeProfile storeCover storeProducts storeAddress storeCollections"
        );

        res.json(newStore);
      }
    });
  }
};

export const getCollections = async (req, res) => {
  const { token } = req.cookies;

  jwt.verify(token, jwtSecret, {}, async (err, userdata) => {
    if (err) throw err;
    const user = await User.findById(userdata.id).populate(
      "store",
      "storeCollections"
    );
    console.log(user);
    res.json(user.store.storeCollections);
  });
};

export const addCollectionItem = async (req, res) => {
  const { collectionInput, storeId } = req.body;

  const store = await Store.findById(storeId);

  store.storeCollections.push(collectionInput);

  await store.save();

  res.json(store.storeCollections);
};

export const deleteCollection = async (req, res) => {
  const { item, storeId } = req.body;
  const store = await Store.findById(storeId);

  const newArray = store.storeCollections;

  newArray.splice(item, 1);
  console.log(newArray);

  /*store.set({
    storeCollections: [...newArray],
  });

  await store.save();*/

  res.json("ok");
};
