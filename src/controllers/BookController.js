const Book = require("../models/Book");

const BookController = {
  getAllBooks: async (req, res) => {
    try {
      const books = await Book.find();
      return res.status(200).json(books);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
  addBook: async (req, res) => {
    try {
      const newBook = new Book({
        name: req.body.name,
        author: req.body.author,
        description: req.body.description,
        img: req.body.img,
        price: req.body.price,
        number: req.body.number,
      });
      const book = await newBook.save();
      res.status(200).json(book);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  deleteBook: async (req, res) => {
    try {
      const bookID = req.params.id;
      const book = await Book.findByIdAndDelete(bookID);
      res.status(200).json(book);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
};

module.exports = BookController;
