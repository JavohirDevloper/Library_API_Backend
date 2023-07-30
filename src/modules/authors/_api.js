const express = require("express");
const {
  getAuthorById,
  updateAuthor,
  removeAuthor,
  getAuthors,
  createAuthor,
} = require("./_controllers");
const isLoggedIn = require("../../shared/auth/is-loggedin");


const router = express.Router();

router.post("/authors", isLoggedIn, createAuthor);
router.get("/authors", isLoggedIn, getAuthors);
router.get("/authors/:id", isLoggedIn, getAuthorById);
router.patch("/authors/:id", isLoggedIn, updateAuthor);
router.delete("/authors/:id", isLoggedIn, removeAuthor);

module.exports = router;
