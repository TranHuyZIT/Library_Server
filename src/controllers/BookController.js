const Book = require("../models/Book");
const BookGenre = require("../models/BookGenre");

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
  getAllGenres: async (req, res) => {
    try {
      const bookGenres = await BookGenre.find();
      return res.status(200).json(bookGenres);
    } catch (error) {
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
        genre: req.body.genre,
      });
      const book = await newBook.save();
      return res.status(200).json(book);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
  deleteBook: async (req, res) => {
    try {
      const bookID = req.params.id;
      const book = await Book.findByIdAndDelete(bookID);
      return res.status(200).json(book);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
  updateBook: async (req, res) => {
    try {
      const bookID = req.params.id;
      const updatedBookInfo = req.body;
      const updatedBook = await Book.findByIdAndUpdate(
        bookID,
        updatedBookInfo,
        { new: true }
      );
      return res.status(200).json(updatedBook);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
};

module.exports = BookController;
