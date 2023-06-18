import jwt from "jsonwebtoken";
import User from "../Models/user.js";
import Store from "../Models/store.js";
import Product from "../Models/product.js";

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
  const { itemName, storeId } = req.body;

  const store = await Store.findById(storeId);

  store.storeCollections.splice(itemName, 1);

  await store.save();

  res.json("ok");
};

export const collectionChange = async (req, res) => {
  const { newCollectionName, storeId, index, oldCollectionName } = req.body;

  const store = await Store.findById(storeId);

  const { storeCollections } = store;
  const newArray = [...storeCollections];
  newArray.splice(index, 0, newCollectionName);
  const newIndex = index + 1;
  newArray.splice(newIndex, 1);

  store.set({
    storeCollections: [...newArray],
  });

  await store.save();

  await Product.updateMany(
    { productCollection: oldCollectionName },
    { $set: { productCollection: newCollectionName } }
  );

  res.json("ok");
};
