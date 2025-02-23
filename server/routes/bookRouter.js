const express = require("express");

const router = express.Router();
const authMiddleware = require("../middlewares/authMidddleware");
const isLibrarian = require("../helper");
const Book = require("../models/Book");

router.get("/", authMiddleware, async (req, res) => {
  try {
    const books = await Book.find({});

    res.status(200).json(books);
  } catch (error) {
    res.status(400).json({
      error: error.message,
      message: "Something while wrong fecting book data",
    });
  }
});

router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      res.status(400).json({
        message: "Invalid book id",
      });
    }

    res.status(200).json(book);
  } catch (error) {
    res.status(400).json({
      error: error.message,
      message: "Something while wrong fecting book id  data",
    });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  try {
    if (req.user.userType === 'Librarian') {
      const book = await Book(req.body);
      await book.save();
      res.status(200).json({message:"Book Added Sucessfully", book:book})
    } else {
      return res
        .status(404)
        .json({ message: "Your are not authorized to access this  book" });
    }
  } catch (error) {
    res.status(400).json({
      message: "Something while wrong while adding the  book data",error: error.message
    });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    if (req.user.userType === 'Librarian') {
      const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });

      if (!book) {
        return res.status(404).json({ message: "book not found" });
      }

      res.status(200).json(book);
    } else {
      return res
        .status(404)
        .json({ message: "Your are not authorized to access this  book" });
    }
  } catch (error) {
    res.status(500).json({
        message: "Something while wrong while updating the  book data",error: error.message
    });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    if (req.user.userType === 'Librarian') {
      const book = await Book.findByIdAndDelete(req.params.id);

      if (!book) {
        return res.status(404).json({ message: "book not found" });
      }

      res.status(200).json(book);
    } else {
      return res
        .status(404)
        .json({ message: "Your are not authorized to access this  book" });
    }
  } catch (error) {
    res.status(500).json({
        message: "Something while wrong while removing  the  book data",error: error.message
    });
  }
});

module.exports=router;