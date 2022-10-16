const Order = require("../models/Order");
const Book = require("../models/Book");
const OrderDetail = require("../models/OrderDetail");
const mongoose = require("mongoose");
const OrderController = {
  addOrder: async (req, res) => {
    try {
      const newOrder = new Order({
        userID: req.body.userID,
        userName: req.body.userName,
        totalPrice: req.body.totalPrice,
        rating: req.body.rating,
      });
      // Add all order details
      const booksOrdered = req.body.books;
      booksOrdered.forEach(async (book) => {
        const bookID = book._id;
        const newOrderDetail = new OrderDetail({
          orderID: newOrder._id,
          bookID,
          number: 1,
        });
        await newOrderDetail.save();
      });

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
        let orderDetails = await OrderDetail.find({
          orderID: allOrders[i]._id,
        });
        result.push({
          ...allOrders[i]._doc,
          books: [...orderDetails],
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
      const { orderID } = req.body;
      let orderDetails = await OrderDetail.find({
        orderID,
      });
      const books = [];
      let i;
      for (i = 0; i < orderDetails.length; i++) {
        const bookID = orderDetails[i].bookID;
        const book = await Book.find({ _id: bookID });
        console.log(book[0]);
        books.push(book[0]);
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
