import jwt from "jsonwebtoken";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import User from "../Models/user.js";
import Store from "../Models/store.js";
import Product from "../Models/product.js";

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
