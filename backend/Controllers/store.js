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
  console.log("da");
  const { path, originalname, mimetype } = req.files[0];

  const url = await uploadToS3(path, originalname, mimetype);
  res.json(url);
};

export const addProduct = async (req, res) => {
  const { token } = req.cookies;
  const { productPrice, productTitle, productPicture, productDescription } =
    req.body;

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
    });

    const { storeProducts } = userStore;
    storeProducts.push(newProduct._id);
    await userStore.save();
    res.json(userStore.storeProducts);
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
      "productName productPicture productDescription productRating productNewPrice productOldPrice"
    );

    res.json(userStore);
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
  } = req.body;

  const editedProduct = await Product.findById(selectedProduct);

  editedProduct.productName = productTitle;
  editedProduct.productDescription = productDescription;
  editedProduct.productNewPrice = productPrice;
  editedProduct.productPicture = productPicture;

  await editedProduct.save();

  res.json(editedProduct);
};

export const newProductArray = async (req, res) => {
  const { token } = req.cookies;
  const { storeProducts } = req.body;
  let storeProductArray = [];
  storeProducts.forEach((item) => {
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
    "productName productPicture productDescription productRating productNewPrice productOldPrice"
  );

  res.json(store);
};

export const getOrders = async (req, res) => {
  const { token } = req.cookies;
  const { formattedDate } = req.body;

  console.log(formattedDate);

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
  const { idd, shippingDate } = req.body;

  const sale = await Sale.findById(idd);

  sale.set({
    productShipped: true,
    arrivalDate: shippingDate,
  });

  await sale.save();

  res.json(sale);
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
  console.log(storeId, formattedDate);
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
  console.log(newArray);

  newArray.forEach((item) => (sum += item));
  console.log(sum);

  res.json(sum);
};
