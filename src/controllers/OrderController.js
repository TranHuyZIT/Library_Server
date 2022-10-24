const Order = require("../models/Order");
const Book = require("../models/Book");
const OrderDetail = require("../models/OrderDetail");
const mongoose = require("mongoose");
const OrderController = {
  addOrder: async (req, res) => {
    try {
      // Enter New Order Step 6
      const orderInfo = {};
      // Enter New Order Step 7
      orderInfo.userID = req.body.userID;
      orderInfo.fullName = req.body.fullName;
      orderInfo.phoneNumber = req.body.phone;
      orderInfo.address = req.body.address;
      orderInfo.totalPrice = req.body.totalPrice;
      orderInfo.rating = req.body.rating;
      orderInfo.books = req.body.books;
      orderInfo.number = req.body.number;

      // Enter New Order Step 8
      const orderCabinet = {};
      // Enter New Order Step 9
      orderCabinet.userID = orderInfo.userID;
      orderCabinet.fullName = orderInfo.fullName;
      orderCabinet.phoneNumber = orderInfo.phoneNumber;
      orderCabinet.address = orderInfo.address;
      orderCabinet.totalPrice = orderInfo.totalPrice;
      orderCabinet.rating = orderInfo.rating;

      // Enter New Order Step 10
      const largeCabinet = {};
      // Enter New Order Step 11
      largeCabinet.books = orderInfo.books;
      largeCabinet.number = orderInfo.number;

      // Enter New Order Step 14
      const newOrder = new Order(orderCabinet);
      // Add all order details
      largeCabinet.books.forEach(async (book) => {
        const bookID = book._id;
        // Enter New Order Step 15
        const newOrderDetail = new OrderDetail({
          orderID: newOrder._id,
          bookID,
          number: parseInt(largeCabinet.number[bookID]),
        });
        // Enter New Order Step 16
        await newOrderDetail.save();
      });
      // Enter New Order Step 16
      const order = await newOrder.save();
      return res.status(200).json(order);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
  getAllOrders: async (req, res) => {
    try {
      const completed = req.query.completed;
      let allOrders = await Order.find({ isCompleted: completed });
      let i;
      const result = [];
      for (i = 0; i < allOrders.length; i++) {
        result.push({
          ...allOrders[i]._doc,
        });
      }
      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
  getBooksFromOrderDetails: async (req, res) => {
    try {
      const orderID = req.params.id;
      let orderDetails = await OrderDetail.find({
        orderID,
      });
      console.log(orderID);
      const books = [];
      let i;
      for (i = 0; i < orderDetails.length; i++) {
        const bookID = orderDetails[i].bookID;
        const book = await Book.findOne({ _id: bookID });
        books.push({ ...book._doc, number: orderDetails[i].number });
      }
      return res.status(200).json(books);
    } catch (error) {
      console.log(error);
      return res.status(501).json(error);
    }
  },

  completeOrder: async (req, res) => {
    try {
      const orderID = req.params.id;
      const order = await Order.findByIdAndUpdate(orderID, {
        isCompleted: true,
      });
      return res.status(200).json(order);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
};

module.exports = OrderController;
