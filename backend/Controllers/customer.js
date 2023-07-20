import jwt from "jsonwebtoken";
import User from "../Models/user.js";
import Store from "../Models/store.js";
import Product from "../Models/product.js";
import bcrypt from "bcrypt";
import Sale from "../Models/sale.js";
import Review from "../Models/review.js";
import Chat from "../Models/chat.js";
import axios from "axios";

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

  fsale.set({
    productBought: newArray,
  });

  await fsale.save();

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

export const searchResults = async (req, res) => {
  const { searchValue, option } = req.body;

  if (option === "stores") {
    const regex = new RegExp(`${searchValue}`, "gi");
    const specificStore = await Store.find({ storeName: regex }).lean().exec();

    const jsonsend = [...specificStore];

    const newArray = jsonsend.map((item) => {
      return { ...item, search: option };
    });

    res.json(newArray);
  } else {
    const regex = new RegExp(`${searchValue}`, "gi");
    const specificProduct = await Product.find({ productName: regex })
      .lean()
      .exec();
    const jsonsend = [...specificProduct];

    const newArray = jsonsend.map((item) => {
      return { ...item, search: option };
    });

    res.json(newArray);
  }
};

export const getProductStore = async (req, res) => {
  const { id } = req.body;

  const findStore = await Store.findOne({ storeProducts: id });

  res.json(findStore);
};

export const getReview = async (req, res) => {
  const { productId } = req.body;

  const getReviews = await Product.findById(productId).populate({
    path: "productReview",
    select: " commentBy comment rating pictures commentOn",
    populate: {
      path: "commentBy",
      select: "username profilePicture",
    },
  });

  res.json(getReviews.productReview);
};

export const submitReview = async (req, res) => {
  const { id, reviewPic, comment, productId, rating } = req.body;
  const { token } = req.cookies;

  jwt.verify(token, jwtSecret, {}, async (err, data) => {
    if (err) throw err;
    const userCommented = await User.findById(data.id);

    userCommented.reviewsLeft.push(productId);

    await userCommented.save();
  });

  const newReview = await Review.create({
    commentBy: id,
    commentOn: productId,
    comment,
    pictures: reviewPic,
    rating,
  });

  const findProduct = await Product.findById(productId);

  findProduct.productReview.push(newReview._id);

  await findProduct.save();
  res.json(newReview);
};

export const deleteReview = async (req, res) => {
  const { deleteReview, productId } = req.body;
  const { token } = req.cookies;

  jwt.verify(token, jwtSecret, {}, async (err, data) => {
    if (err) throw err;
    const userCommented = await User.findById(data.id);

    const newArray = userCommented.reviewsLeft.filter(
      (product) => product !== productId
    );

    userCommented.set({
      reviewsLeft: [...newArray],
    });

    await userCommented.save();
  });

  const findReview = await Review.findByIdAndDelete(deleteReview);
  res.json("ok");
};

export const getHomePage = async (req, res) => {
  const allStores = await Store.find();

  res.json(allStores);
};

export const getAllChat = async (req, res) => {
  const { token } = req.cookies;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const user = await User.findById(userData.id).populate({
      path: "chat",
      select: " participants messages",
      populate: {
        path: "participants",
        select: "username profilePicture",
      },
    });
    res.json(user.chat);
  });
};

export const getAllUsers = async (req, res) => {
  const allUsers = await User.find().populate("store", "storeProfile");

  res.json(allUsers);
};

export const sendMessage = async (req, res) => {
  const { senderId, receiverId, message, chatId, date, time } = req.body;
  const { token } = req.cookies;
  const messageSent = {
    id: senderId,
    messages: message,
    date: date,
    time: time,
  };
  const receiverUser = await User.findById(receiverId);
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const user = await User.findById(userData.id).populate(
      "chat",
      "participants, messages"
    );
    if (chatId) {
      const chat = await Chat.findById(chatId);
      // UPDEJTANJE USER PROPERTIJA NA TEMELJU CEGA RADIM NOTIFIKACIJE O PORUKAMA
      /*   const isChatInUser = receiverUser.allChat.some(
       (property) => property === chatId
      );
      if (isChatInUser) {
        const foundObject = receiverUser.allChat(
          (object) => object.id === chatId
        );
        foundObject.oldChatCount = chat.messages.length - 1;
        foundObject.newChatCount = chat.messages.length;
      } else {
        const receiverUserChat = {
          id: chatId,
          oldChatCount: chat.messages.length - 1,
          newChatCount: chat.messages.length,
        }; 
        receiverUser.allChat.push(receiverUserChat);
        await receiverUser.save();
      }*/ chat.messages.push(messageSent);
      await chat.save();
      const foundObject = receiverUser.allChat.find(
        (object) => object.id.toString() === chatId
      );
      const foundObject2 = user.allChat.find(
        (object) => object.id.toString() === chatId
      );
      foundObject.newChatCount = foundObject.newChatCount + 1;
      foundObject2.newChatCount = foundObject2.newChatCount + 1;
      foundObject2.oldChatCount = foundObject2.oldChatCount + 1;

      receiverUser.markModified("allChat");
      user.markModified("allChat");
      await receiverUser.save();
      await user.save();
      res.json(chat);
    } else {
      const newMessage = await Chat.create({
        participants: [senderId, receiverId],
        messages: [messageSent],
      });

      const receiverUserChat = {
        id: newMessage._id,
        oldChatCount: 0,
        newChatCount: 1,
      };
      const senderUserChat = {
        id: newMessage._id,
        oldChatCount: 1,
        newChatCount: 1,
      };
      receiverUser.allChat.push(receiverUserChat);
      user.allChat.push(senderUserChat);

      receiverUser.chat.push(newMessage._id);
      user.chat.push(newMessage._id);
      await user.save();
      await receiverUser.save();

      res.json(user);
    }

    // AK USER NEMA NI JEDAN AKTIVAN CHAT i TE DVIJE OSOBE JOS NISU CHATALE ONDA SE RADI NOVI CHAT NA OBA PROFILA
    /*if (!user.chat.participants) {
      const newMessage = await Chat.create({
        participants: [senderId, receiverId],
        messages: [messageSent],
      });
      const receivingUser = await User.findById(receiverId);
      receivingUser.chat.push(newMessage._id);
      user.chat.push(newMessage._id);
      await user.save();
      await receivingUser.save();
      res.json(newMessage);
    } else {
      // AK CHAT IZMEDU TA DVA USERA POSTOJI
      if (user.chat.participants.includes(receiverId)) {
   
        const chat = await Chat.findById(chatId);
        chat.messages.push(messageSent);

        await chat.save();
      } else {
        // AK TE DVIJE OSOBE JOS NISU CHATALE ONDA SE RADI NOVI CHAT NA OBA PROFILA
        const newMessage = await Chat.create({
          participants: [senderId, receiverId],
          messages: [messageSent],
        });
        const receivingUser = await User.findById(receiverId);
        receivingUser.chat.push(newMessage._id);
        user.chat.push(newMessage._id);
        await user.save();
        await receivingUser.save();
        res.json(newMessage);
      }
    }*/
  });
};

/*export const seenMessage = async (req, res) => {
  const { chatId, userId } = req.body;
  let user = await User.findById(userId);

  const found = user.allChat.find((object) => object.id.toString() === chatId);
  const newValue = found.newChatCount;

  await user.updateOne(
    { _id: userId, "allChat.id": chatId },
    { $set: { "allChat.$.oldChatCount": newValue } }
  );

  res.json("ok");
};*/

export const seenMessage = async (req, res) => {
  const { chatId, userId } = req.body;
  try {
    let user = await User.findById(userId);

    // Check if user was found
    if (!user) {
      return res.status(404).json("User not found");
    }

    const found = user.allChat.find(
      (object) => object.id.toString() === chatId
    );

    // Check if chat was found
    if (!found) {
      return res.status(404).json("Chat not found");
    }
    if (found.oldChatCount === found.newChatCount) {
    } else {
      const newValue = found.newChatCount;

      found.oldChatCount = newValue;
      user.markModified("allChat");
      await user.save();

      res.json(found);
    }
  } catch (error) {
    // Handle any errors
    res.status(500).json({ error: error.toString() });
  }
};
