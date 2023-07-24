import jwt from "jsonwebtoken";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import User from "../Models/user.js";
import Store from "../Models/store.js";
import Product from "../Models/product.js";
import Sale from "../Models/sale.js";

const bucket = "gymtok-photo-video-upload";
const jwtSecret = "rockjefakatludirock";

async function uploadToS3(path, orignalFilename, mimetype) {
  const client = new S3Client({
    region: "eu-north-1",
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
  });
  const parts = orignalFilename.split(".");
  const ext = parts[parts.length - 1];
  const newFilename = Date.now() + "." + ext;

  const data = await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Body: fs.readFileSync(path),
      Key: newFilename,
      ContentType: mimetype,
      ACL: "public-read",
    })
  );
  return `https://${bucket}.s3.amazonaws.com/${newFilename}`;
}

export const editStore = async (req, res) => {
  const { token } = req.cookies;
  const { name, address, description, profilePhoto, coverPhoto } = req.body;

  jwt.verify(token, jwtSecret, {}, async (err, data) => {
    if (err) throw err;
    const user = await User.findById(data.id);
    const { store } = user;

    const findStore = await Store.findById(store);

    findStore.set({
      storeName: name,
      storeDescription: description,
      storeProfile: profilePhoto,
      storeCover: coverPhoto,
      storeAddress: address,
    });

    await findStore.save();

    res.json(findStore);
  });
};

export const uploadImage = async (req, res) => {
  const { path, originalname, mimetype } = req.files[0];
  const url = await uploadToS3(path, originalname, mimetype);
  res.json(url);
};

export const uploadVideo = async (req, res) => {
  const { path, filename, mimetype } = req.file;
  const url = await uploadToS3(path, filename, mimetype);
  res.json(url);
};

export const addProduct = async (req, res) => {
  const { token } = req.cookies;
  const {
    productPrice,
    productTitle,
    productPicture,
    productDescription,
    productStore,
    collection,
  } = req.body;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const user = await User.findById(userData.id);
    const { store } = user;
    const userStore = await Store.findById(store);
    const newProduct = await Product.create({
      productName: productTitle,
      productDescription,
      productNewPrice: productPrice,
      productPicture,
      productIsBeingDragged: false,
      store: productStore,
      productCollection: collection,
    });

    const { storeProducts } = userStore;
    storeProducts.push(newProduct._id);
    await userStore.save();
    res.json(newProduct);
  });
};

export const getStoreProducts = async (req, res) => {
  const { token } = req.cookies;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const user = await User.findById(userData.id);
    const { store } = user;

    const userStore = await Store.findById(store).populate(
      "storeProducts",
      "productName productPicture productDescription productRating productNewPrice productOldPrice productCollection"
    );

    res.json(userStore.storeProducts);
  });
};

export const deleteProduct = async (req, res) => {
  const { selectedProduct } = req.body;

  const deleteProduct = await Product.deleteOne({ _id: selectedProduct });

  res.json(deleteProduct);
};

export const getCurrentProduct = async (req, res) => {
  const { selectedProduct } = req.body;

  const newProduct = await Product.findById(selectedProduct);

  res.json(newProduct);
};

export const editProduct = async (req, res) => {
  const {
    productPrice,
    productTitle,
    productPicture,
    productDescription,
    selectedProduct,
    collection,
  } = req.body;

  const editedProduct = await Product.findById(selectedProduct);

  editedProduct.productName = productTitle;
  editedProduct.productDescription = productDescription;
  editedProduct.productNewPrice = productPrice;
  editedProduct.productPicture = productPicture;
  editedProduct.productCollection = collection;

  await editedProduct.save();

  res.json(editedProduct);
};

export const newProductArray = async (req, res) => {
  const { token } = req.cookies;
  const { userStoreProducts } = req.body;
  let storeProductArray = [];
  userStoreProducts.forEach((item) => {
    const id = item._id;
    storeProductArray.push(id);
  });

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const user = await User.findById(userData.id);
    const { store } = user;

    const newStore = await Store.findById(store._id);

    newStore.set({
      storeProducts: storeProductArray,
    });

    await newStore.save();
  });
};

export const fetchStoreData = async (req, res) => {
  const { storeid } = req.body;

  const store = await Store.findById(storeid).populate(
    "storeProducts",
    "productName productPicture productDescription productRating productNewPrice productOldPrice productCollection"
  );

  res.json(store);
};

export const getOrders = async (req, res) => {
  const { token } = req.cookies;
  const { formattedDate } = req.body;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const user = await User.findById(userData.id);

    const store = await Store.findById(user.store._id).populate({
      path: "storeSales",
      select:
        "productBought productShipped total productQuantity orderPlacedDate noteToSeller buyerUsername arrivalDate",
      populate: {
        path: "productBought",
        select:
          "productName productPicture productDescription productNewPrice ",
      },
    });
    const salesByDate = store.storeSales.filter(
      (item) => item.orderPlacedDate === formattedDate
    );

    res.json(salesByDate);
  });
};

export const confirmOrder = async (req, res) => {
  const { idd, shippingDate, quantity, productId } = req.body;

  const product = await Product.findById(productId);

  const { productSold } = product;

  product.set({
    productSold: productSold + quantity,
  });

  await product.save();

  const sale = await Sale.findById(idd);

  sale.set({
    productShipped: true,
    arrivalDate: shippingDate,
  });

  await sale.save();

  res.json(product);
};

export const cancelOrder = async (req, res) => {
  const { idd } = req.body;

  const sale = await Sale.findById(idd);

  sale.set({
    productShipped: false,
    arrivalDate: null,
  });

  await sale.save();

  res.json(sale);
};

export const getDailySales = async (req, res) => {
  const { storeId, formattedDate } = req.body;

  const store = await Store.findById(storeId).populate(
    "storeSales",
    "orderPlacedDate total"
  );

  const todaySales = store.storeSales.filter(
    (item) => item.orderPlacedDate === formattedDate
  );

  const totalCounter = todaySales.map((item) => {
    if (item.total > 0) {
      return item.total;
    } else {
    }
  });
  let sum = 0;
  const newArray = totalCounter.filter((item) => item > 0);

  newArray.forEach((item) => (sum += item));

  res.json(sum);
};

export const getTotalSales = async (req, res) => {
  const { storeId } = req.body;

  const store = await Store.findById(storeId).populate("storeSales", "total");

  const newArray = store.storeSales.filter((item) => item.total >= 0);

  let sum = 0;

  newArray.forEach((item) => (sum += item.total));

  res.json(sum);
};

export const getLast5 = async (req, res) => {
  const { storeId } = req.body;

  const store = await Store.findById(storeId).populate({
    path: "storeSales",
    select:
      "productBought productShipped total productQuantity orderPlacedDate noteToSeller buyerUsername arrivalDate",
    populate: {
      path: "productBought",
      select: "productName productPicture productDescription productNewPrice ",
    },
  });
  const arrayLength = store.storeSales.length - 5;
  const sortedSales = store.storeSales.splice(arrayLength, 5);

  res.json(sortedSales);
};

export const getAllStores = async (req, res) => {
  const allStores = await Store.find().populate(
    "storeProducts",
    "productName productPicture productDescription productNewPrice "
  );

  res.json(allStores);
};

export const getTrendingStore = async (req, res) => {
  const trendingStore = await Store.find();

  let array = [];

  //razvrstavanje da mi array ima vise od 0 itema da mi ne bude undefined
  trendingStore.forEach((store) => {
    if (store.storeSales.length > 0) {
      array.push(store);
    }
  });

  const lengt = array.map((item) => item.storeSales.length);
  const mostSales = Math.max(...lengt);

  const index = lengt.findIndex((item) => item === mostSales);

  res.json(array[index]);
};

export const getAllProducts = async (req, res) => {
  const allProducts = await Product.find().populate("store", "storeName _id");
  /*function shuffleArray(array) {
    const newArray = [...array];
    newArray.forEach((_, i) => {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    });
    return newArray;
  }*/

  res.json(allProducts);
};

export const getMostSoldProduct = async (req, res) => {
  const allProducts = await Product.find().populate("store", "storeName _id");

  const newArray = allProducts.map((product) => product.productSold);

  const mostSold = Math.max(...newArray);
  const index = newArray.findIndex((sold) => sold === mostSold);

  res.json(allProducts[index]);
};
