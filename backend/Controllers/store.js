import jwt from "jsonwebtoken";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import User from "../Models/user.js";
import { Store } from "../Models/store.js";
import Product from "../Models/product.js";
import Sale from "../Models/sale.js";
import Collection from "../Models/collection.js";

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

    if (name) {
      user.set({
        username: name,
      });
    }
    if (profilePhoto) {
      user.set({
        profilePicture: profilePhoto,
      });
    }

    await findStore.save();
    await user.save();

    res.json({ store: findStore, user: user });
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
    collectionId,
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

    const kolekcija = await Collection.findById(collectionId);
    kolekcija.collectionProducts.push(newProduct._id);

    const { storeProducts } = userStore;
    storeProducts.push(newProduct._id);
    await userStore.save();
    await kolekcija.save();
    res.json(kolekcija);
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
    oldCollection,
    collectionId,
    oldCollectionId,
  } = req.body;

  const editedProduct = await Product.findById(selectedProduct);

  editedProduct.productName = productTitle;
  editedProduct.productDescription = productDescription;
  editedProduct.productNewPrice = productPrice;
  editedProduct.productPicture = productPicture;
  editedProduct.productCollection = collection;

  if (collection === oldCollection) {
    res.json(editedProduct);
    await editedProduct.save();
  } else {
    const oldKolekcija = await Collection.findById(oldCollectionId);
    const novaKolekcija = await Collection.findById(collectionId);

    const collProdOld = oldKolekcija.collectionProducts.filter(
      (product) => product.toString() !== selectedProduct.toString()
    );
    oldKolekcija.set({
      collectionProducts: [...collProdOld],
    });

    novaKolekcija.collectionProducts.push(selectedProduct);

    await novaKolekcija.save();
    await oldKolekcija.save();
    await editedProduct.save();

    res.json({
      stara: oldKolekcija,
      nova: novaKolekcija,
    });
  }
};

export const newProductArray = async (req, res) => {
  const { collectionId, collectionNewOrder } = req.body;
  const { token } = req.cookies;

  if ((collectionId, collectionNewOrder)) {
    const findCollection = await Collection.findById(collectionId);

    if (findCollection) {
      findCollection.set({
        collectionProducts: [...collectionNewOrder],
      });

      await findCollection.save();
    } else {
      console.error("findCollection is null");
    }

    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const newKolekcija = await User.findById(userData.id).populate({
        path: "store",
        select:
          "storeName storeDescription storeProfile storeCover storeProducts storeAddress storeCollections",
        populate: {
          path: "storeCollections",
          select: "collectionName collectionProducts",

          populate: {
            path: "collectionProducts",
            select:
              "productName productCollection productPicture productDescription productRating productNewPrice productOldPrice productSold productRating productScore",
          },
        },
      });

      res.json(newKolekcija.store);
    });
  } else {
    console.log(collectionId, collectionNewOrder);
  }
};

export const fetchStoreData = async (req, res) => {
  const { storeid } = req.body;

  const store = await Store.findById(storeid).populate(
    "storeProducts",
    "productName productPicture productDescription productRating productNewPrice productOldPrice productCollection"
  );

  const user = await User.findOne({ store: storeid }).populate({
    path: "store",
    select:
      "storeName storeDescription storeProfile storeCover storeProducts storeAddress storeCollections",
    populate: {
      path: "storeCollections",
      select: "collectionName collectionProducts",

      populate: {
        path: "collectionProducts",
        select:
          "productName productCollection productPicture productDescription productRating productNewPrice productOldPrice productSold productRating productScore",
      },
    },
  });

  res.json({
    store: store,
    user: user,
  });
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
          "productName productPicture productDescription productNewPrice productRating productScore ",
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
      select:
        "productName productPicture productDescription productNewPrice productRating  productScore",
    },
  });
  const arrayLength = store.storeSales.length - 5;
  const sortedSales = store.storeSales.splice(arrayLength, 5);

  res.json(sortedSales);
};

export const getAllStores = async (req, res) => {
  const allStores = await Store.find().populate(
    "storeProducts",
    "productName productPicture productDescription productNewPrice productRating productScore "
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

  const storeId = array[index]._id;

  const userStore = await User.findOne({ store: storeId }).populate({
    path: "store",
    select:
      "storeName storeDescription storeProfile storeCover storeProducts storeAddress storeCollections",
    populate: {
      path: "storeCollections",
      select: "collectionName collectionProducts",

      populate: {
        path: "collectionProducts",
        select:
          "productName productCollection productPicture productDescription productRating productNewPrice productOldPrice productSold productRating productScore",
      },
    },
  });
  res.json(userStore.store);
};

export const getAllProducts = async (req, res) => {
  const allProducts = await Product.find().populate("store", "storeName _id");

  res.json(allProducts);
};

export const getMostSoldProduct = async (req, res) => {
  const allProducts = await Product.find().populate("store", "storeName _id");

  const newArray = allProducts.map((product) => product.productSold);

  const mostSold = Math.max(...newArray);
  const index = newArray.findIndex((sold) => sold === mostSold);

  res.json(allProducts[index]);
};

export const followStore = async (req, res) => {
  const { followerId, userStoreId } = req.body;

  const followedStoreUser = await User.findById(userStoreId);
  const user = await User.findById(followerId);

  user.followings.push(userStoreId);

  followedStoreUser.followers.push(followerId);

  await followedStoreUser.save();
  await user.save();

  res.json({
    user: user,
    storefollowed: followedStoreUser,
  });
};

export const unfollowStore = async (req, res) => {
  const { unfollowerId, userStoreId } = req.body;

  const followedStoreUser = await User.findById(userStoreId);
  const user = await User.findById(unfollowerId);

  const newFollowings = user.followings.filter(
    (storeid) => storeid.toString() !== userStoreId.toString()
  );
  user.set({
    followings: [...newFollowings],
  });

  const newFollowers = followedStoreUser.followers.filter(
    (userid) => userid.toString() !== unfollowerId.toString()
  );
  followedStoreUser.set({
    followers: [...newFollowers],
  });
  await followedStoreUser.save();
  await user.save();

  res.json({
    user: user,
    storefollowed: followedStoreUser,
  });
};

export const getFollow = async (req, res) => {
  const { userId } = req.body;

  const user = await User.findById(userId).populate([
    {
      path: "followers",
      select: "username profilePicture _id",
    },
    { path: "followings", select: "username profilePicture _id " },
  ]);

  res.json({
    followers: user.followers,
    followings: user.followings,
  });
};

export const removeFollower = async (req, res) => {
  const { removeFollower, select } = req.body;
  const { token } = req.cookies;

  if (select === "Followers") {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const user = await User.findById(userData.id);

      const newFollowers = user.followers.filter(
        (follower) => follower.toString() !== removeFollower.toString()
      );

      user.set({
        followers: [...newFollowers],
      });

      await user.save();

      const removedFollower = await User.findById(removeFollower);

      const newFollowing = removedFollower.followings.filter(
        (following) => following.toString() !== userData.id.toString()
      );

      removedFollower.set({
        followings: [...newFollowing],
      });

      await removedFollower.save();

      res.json({
        user: user.followers,
        removedUser: removedFollower.followings,
      });
    });
  } else {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const user = await User.findById(userData.id);

      const newFollowings = user.followings.filter(
        (following) => following.toString() !== removeFollower.toString()
      );

      user.set({
        followings: [...newFollowings],
      });

      await user.save();

      const removedFollower = await User.findById(removeFollower);

      const newFollowers = removedFollower.followers.filter(
        (followers) => followers.toString() !== userData.id.toString()
      );

      removedFollower.set({
        followers: [...newFollowers],
      });

      await removedFollower.save();

      res.json({
        user: user.followers,
        removedUser: removedFollower.followings,
      });
    });
  }
};

export const weeklySales = async (req, res) => {
  const { userId, formattedDate } = req.body;

  // formiranje arraya sedam dana unazad od danasnjeg datuma
  const oldDay = Number(formattedDate.substring(3, 5));
  let newArray = [];
  for (let i = 0; i < 7; i++) {
    let newDay = oldDay - i;
    let noviDatum = formattedDate.replace(`${oldDay}`, `${newDay}`);
    newArray.push(noviDatum);
  }

  const user = await User.findById(userId).populate({
    path: "store",
    select: "storeSales",
    populate: {
      path: "storeSales",
      select: "total orderPlacedDate",
    },
  });
  const lastWeekSales = user.store.storeSales.filter((sale) =>
    newArray.includes(sale.orderPlacedDate)
  );

  // formiranje arraya sa samo jednim datumom (prodaje s istim datumom zbrajaju se skupa u jedan datum)
  let newSalesArray = [];

  newArray.forEach((item) =>
    newSalesArray.push({ orderPlacedDate: item, total: 0 })
  );
  lastWeekSales.forEach((sale) => {
    newSalesArray.forEach((item) => {
      if (item.orderPlacedDate === sale.orderPlacedDate) {
        item.total += sale.total;
      }
    });
  });

  // finalni objekt za chartJS
  const chartData = {
    labels: newSalesArray.map((sale) => sale.orderPlacedDate),
    datasets: [
      {
        label: "Sales per day in $",
        data: newSalesArray.map((sale) => sale.total),
        backgroundColor: "#F97316",
      },
    ],
  };

  console.log(chartData.datasets[0].data);

  res.json(chartData);
};
