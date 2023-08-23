import jwt from "jsonwebtoken";
import User from "../Models/user.js";
import { Store } from "../Models/store.js";
import { Product } from "../Models/product.js";
import bcryptjs from "bcryptjs";
import Sale from "../Models/sale.js";
import Review from "../Models/review.js";
import Chat from "../Models/chat.js";
import { Post, Comment } from "../Models/post.js";

const jwtSecret = "rockjefakatludirock";
const bcryptSalt = bcryptjs.genSaltSync(10);

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
      "productName productPicture productDescription productRating productNewPrice productOldPrice quantity productOnSale"
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
    const userStore = await Store.findById(user.store._id);

    if (newEmail) {
      user.set({
        email: newEmail,
      });
    }
    if (newUsername) {
      user.set({
        username: newUsername,
      });
      userStore.set({
        storeName: newUsername,
      });
    }
    if (newPassword) {
      user.set({
        password: bcryptjs.hashSync(newPassword, bcryptSalt),
      });
    }
    if (profilePhoto) {
      user.set({
        profilePicture: profilePhoto,
      });
      userStore.set({
        storeProfile: profilePhoto,
      });
    }

    await user.save();
    await userStore.save();

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
          "productName productPicture productDescription productNewPrice productRating productScore productOnSale ",
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

  findProduct.productRating.push(rating);
  findProduct.productReview.push(newReview._id);

  //kalkulacija prosjecne ocjene proizvoda
  const numbers = [...findProduct.productRating];
  let sum = numbers.reduce((acc, num) => acc + num, 0);
  const average = sum / numbers.length;
  const roundedNumber = Math.floor(average * 100) / 100;

  findProduct.set({
    productScore: roundedNumber,
  });

  await findProduct.save();
  res.json(findProduct);
};

export const deleteReview = async (req, res) => {
  const { deleteReview, productId, rating } = req.body;
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

  const findProduct = await Product.findById(productId);

  const removeIndex = findProduct.productRating.indexOf(rating);
  findProduct.productRating.splice(removeIndex, 1);

  //kalkulacija prosjecne ocjene proizvoda
  const numbers = [...findProduct.productRating];
  let sum = numbers.reduce((acc, num) => acc + num, 0);
  const average = sum / numbers.length;
  const roundedNumber = Math.floor(average * 100) / 100;

  findProduct.set({
    productScore: roundedNumber,
  });

  await findProduct.save();
  const findReview = await Review.findByIdAndDelete(deleteReview);
  res.json(findProduct);
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
      chat.messages.push(messageSent);
      await chat.save();
      const foundObject = receiverUser.allChat.find(
        (object) => object.id.toString() === chatId.toString()
      );
      const foundObject2 = user.allChat.find(
        (object) => object.id.toString() === chatId.toString()
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
  });
};

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

export const postUpload = async (req, res) => {
  const { text, videoForm, youtubeForm, product, userId, date } = req.body;
  console.log(product);
  if (videoForm) {
    const post = await Post.create({
      postText: text,
      postVideo: videoForm,
      postProduct: product,
      postAuthor: userId,
      postDate: date,
    });

    res.json(post);
  } else {
    const post = await Post.create({
      postText: text,
      postYoutubeVideo: youtubeForm,
      postProduct: product,
      postAuthor: userId,
      postDate: date,
    });

    res.json(post);
  }
};

export const getAllPosts = async (req, res) => {
  const allPosts = await Post.find().populate([
    {
      path: "postAuthor",
      select: "username profilePicture store",
      populate: {
        path: "store",
        select: "_id",
      },
    },
    {
      path: "postComments",
      select: "commentText commentAuthor",
      populate: {
        path: "commentAuthor",
        select: "username profilePicture",
      },
    },
    {
      path: "postProduct",
      select:
        "productName productPicture productDescription productNewPrice productRating productScore productOnSale",
    },
  ]);

  let sortFromMostLikes = allPosts.sort(
    (a, b) => b.postLikes.length - a.postLikes.length
  );

  console.log(sortFromMostLikes);

  res.json(sortFromMostLikes);
};

export const likePost = async (req, res) => {
  const { postId, userId } = req.body;

  const findPost = await Post.findById(postId);
  findPost.postLikes.push(userId);
  await findPost.save();
  res.json(findPost);
};

export const unlikePost = async (req, res) => {
  const { postId, userId } = req.body;

  const findPost = await Post.findById(postId);
  const newLikes = findPost.postLikes.filter((post) => post !== userId);
  findPost.set({
    postLikes: [...newLikes],
  });
  await findPost.save();
  res.json(findPost);
};

export const removePost = async (req, res) => {
  const { postId } = req.body;

  const findPost = await Post.findByIdAndDelete(postId);

  res.json("ok");
};

export const postComment = async (req, res) => {
  const { comment, userId, postId } = req.body;

  const newComment = await Comment.create({
    commentAuthor: userId,
    commentText: comment,
  });
  const post = await Post.findById(postId);

  post.postComments.push(newComment._id);

  await post.save();
  res.json(newComment);
};

export const deleteComment = async (req, res) => {
  const { commentId } = req.body;
  const deleteComment = await Comment.findByIdAndDelete(commentId);
  res.json("ok");
};

export const specificUserPosts = async (req, res) => {
  const { userId } = req.body;

  const post = await Post.find({ postAuthor: userId }).populate([
    {
      path: "postAuthor",
      select: " username profilePicture store",
      populate: { path: "store", select: "_id" },
    },

    {
      path: "postComments",
      select: "commentText commentAuthor",

      populate: {
        path: "commentAuthor",
        select: "username profilePicture",
      },
    },
    {
      path: "postProduct",
      select:
        "productName productPicture productDescription productNewPrice productRating productScore productOnSale",
    },
  ]);

  res.json(post);
};

export const followingsFeed = async (req, res) => {
  const { userId } = req.body;

  const user = await User.findById(userId);
  const allPosts = await Post.find().populate([
    {
      path: "postAuthor",
      select: " username profilePicture store",
      populate: { path: "store", select: "_id" },
    },

    {
      path: "postComments",
      select: "commentText commentAuthor",

      populate: {
        path: "commentAuthor",
        select: "username profilePicture",
      },
    },
    {
      path: "postProduct",
      select:
        "productName productPicture productDescription productNewPrice productRating productScore productOnSale",
    },
  ]);

  user.followings.push(userId);

  let postsArray = [];
  user.followings.forEach((following) => {
    allPosts.forEach((post) => {
      if (post.postAuthor._id.toString() === following.toString()) {
        postsArray.push(post);
      }
    });
  });

  res.json(postsArray);
};
