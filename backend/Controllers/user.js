import jwt from "jsonwebtoken";
import User from "../Models/user.js";
import { Store } from "../Models/store.js";
import Product from "../Models/product.js";
import Collection from "../Models/collection.js";

const jwtSecret = "rockjefakatludirock";

export const getUser = async (req, res) => {
  const { token } = req.cookies;
  console.log(token);

  if (token) {
    /*jwt.verify(token, jwtSecret, {}, async (err, user) => {
      if (err) throw err;
      const userData = await User.findById(user.id);

      if (userData.role === "Customer") {
      } else {
        const newStore = await User.findById(user.id).populate({
          path: "store",
          select:
            "storeName storeDescription storeProfile storeCover storeProducts storeAddress storeCollections",
          populate: {
            path: "storeCollections",
            select: "collectionName collectionProducts",

            populate: {
              path: "collectionProducts",
              select:
                "productName productCollection productPicture productDescription productRating productNewPrice productOldPrice productSold",
            },
          },
        });

        res.json(newStore);
      }
    });
  }*/
    jwt.verify(token, jwtSecret, {}, async (err, user) => {
      if (err) throw err;
      const userData = await User.findById(user.id).populate({
        path: "store",
        select:
          "storeName storeDescription storeProfile storeCover storeProducts storeAddress storeCollections",
        populate: {
          path: "storeCollections",
          select: "collectionName collectionProducts",

          populate: {
            path: "collectionProducts",
            select:
              "productName productCollection productPicture productDescription productRating productNewPrice productOldPrice productSold",
          },
        },
      });

      res.json(userData);
    });
  }
};

export const getCollections = async (req, res) => {
  const { token } = req.cookies;

  jwt.verify(token, jwtSecret, {}, async (err, userdata) => {
    if (err) throw err;
    const user = await User.findById(userdata.id).populate({
      path: "store",
      select: "storeCollections",
      populate: {
        path: "storeCollections",
        select: "collectionName collectionProducts",

        populate: {
          path: "collectionProducts",
          select:
            "productName productCollection productPicture productDescription productRating productNewPrice productOldPrice productSold",
        },
      },
    });

    res.json(user.store.storeCollections);
  });
};

export const addCollectionItem = async (req, res) => {
  const { collectionInput, storeId } = req.body;

  const store = await Store.findById(storeId);

  const newCollection = await Collection.create({
    collectionName: collectionInput,
  });

  store.storeCollections.push(newCollection._id);

  await store.save();

  res.json(store.storeCollections);
};

export const deleteCollection = async (req, res) => {
  const { itemName, storeId, imeKolekcije, collectionId } = req.body;

  await Product.updateMany(
    { productCollection: imeKolekcije },
    { $set: { productCollection: "" } }
  );

  const kolekcija = await Collection.findByIdAndDelete(collectionId);
  const store = await Store.findById(storeId);

  const newArr = store.storeCollections.filter(
    (collection) => collection.toString() !== collectionId.toString()
  );
  store.set({
    storeCollections: [...newArr],
  });

  await store.save();

  res.json("ok");
};

export const collectionChange = async (req, res) => {
  const { newCollectionName, storeId, index, oldCollectionName, collectionId } =
    req.body;

  const kolekcija = await Collection.findById(collectionId);

  kolekcija.set({
    collectionName: newCollectionName,
  });

  await kolekcija.save();

  /*const store = await Store.findById(storeId);

  const { storeCollections } = store;
  const newArray = [...storeCollections];
  newArray.splice(index, 0, newCollectionName);
  const newIndex = index + 1;
  newArray.splice(newIndex, 1);

  store.set({
    storeCollections: [...newArray],
  });

  await store.save();*/

  await Product.updateMany(
    { productCollection: oldCollectionName },
    { $set: { productCollection: newCollectionName } }
  );

  res.json("ok");
};
