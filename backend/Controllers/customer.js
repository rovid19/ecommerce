import jwt from "jsonwebtoken";
import User from "../Models/user.js";
import Store from "../Models/store.js";
import Product from "../Models/product.js";
import bcrypt from "bcrypt";
import Sale from "../Models/sale.js";

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

export const getShippingDetails = async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const user = await User.findById(userData.id);

    const { shippingDetails } = user;

    res.json(shippingDetails);
  });
};

export const updateShippingDetails = async (req, res) => {
  const { token } = req.cookies;
  const { address, addressDva, country, region, postalCode, phoneNumber } =
    req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const user = await User.findById(userData.id);

    user.set({
      shippingDetails: {
        address,
        addressDva,
        country,
        region,
        phoneNumber,
        postalCode,
      },
    });
    await user.save();
    res.json(user);
  });
};

export const buyProduct = async (req, res) => {
  const { token } = req.cookies;
  const { boughtItems, quantity, storeId, username, formattedDate, total } =
    req.body;

  const newSale = await Sale.create({
    productBought: boughtItems,
    productQuantity: quantity,
    orderPlacedDate: formattedDate,
    seller: storeId,
    buyerUsername: username,
    total: total,
  });

  const store = await Store.findById(storeId);

  store.storeSales.push(newSale._id);

  await store.save();

  const product = newSale._id.toString();

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const user = await User.findById(userData.id);

    user.orderHistory.push(product);

    await user.save();
  });
  res.json(newSale);
};

export const getOrderHistory = async (req, res) => {
  /*const { token } = req.cookies;

  const sale = await Sale.find();

  const saleFilter = sale.filter((item) => item.productBought.length > 0);
  const saleId = saleFilter.map((item) => item._id);

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const user = await User.findById(userData.id);
    user.set({
      orderHistory: saleId,
    });
    await user.save();
    const userDva = await User.findById(userData.id).populate({
      path: "orderHistory",
      select:
        "productBought productShipped productQuantity orderPlacedDate noteToSeller seller arrivalDate",

      populate: {
        path: "productBought",
        select:
          "productName productPicture productDescription productNewPrice ",
      },
    });

    res.json(userDva.orderHistory);
  });*/
  const { token } = req.cookies;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;

    const userDva = await User.findById(userData.id).populate({
      path: "orderHistory",
      select:
        "productBought productShipped productQuantity orderPlacedDate noteToSeller seller arrivalDate",

      populate: {
        path: "productBought",
        select:
          "productName productPicture productDescription productNewPrice ",
      },
    });

    res.json(userDva.orderHistory);
  });
};

export const postNote = async (req, res) => {
  const { idd, note } = req.body;

  const fsale = await Sale.findById(idd);

  fsale.set({
    noteToSeller: note,
  });

  await fsale.save();

  res.json(fsale);
};

export const cancelOrder = async (req, res) => {
  const { productId, idd } = req.body;

  const fsale = await Sale.findById(idd);

  const { productBought } = fsale;

  const newArray = productBought.filter((product) => product === productId);

  console.log(newArray);

  fsale.set({
    productBought: newArray,
  });

  await fsale.save();

  console.log(fsale);

  if (productBought.length === 0) {
    await Sale.findByIdAndDelete(idd);
  }

  res.json(fsale);
};

export const getStore = async (req, res) => {
  const { storeId } = req.body;

  const store = await Store.findById(storeId);

  res.json(store);
};
