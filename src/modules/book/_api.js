const express = require("express");
const router = express.Router();
const { addBook, listBooks, removeBook, editBook } = require("./_controllers");
const isLoggedIn = require("../../shared/auth/is-loggedin");

router.post("/books", isLoggedIn, addBook);
router.get("/books", isLoggedIn, listBooks);
router.get("/books/:id", isLoggedIn, editBook);
router.patch("/books/:id", isLoggedIn, editBook);
router.delete("/books/:id", isLoggedIn, removeBook);

module.exports = router;
