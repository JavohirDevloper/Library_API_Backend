const express = require("express");
const isLoggedIn = require("../../shared/auth/is-loggedin");
const {
  createBorrower,
  getBorrowers,
  getBorrowerById,
  updateBorrower,
} = require("./_controllers");

const router = express.Router();

router.post("/borrowers/login", createBorrower);
router.get("/borrowers/", isLoggedIn, getBorrowers);
router.get("/borrowers/:id", isLoggedIn, getBorrowerById);
router.patch("/borrowers/:id", isLoggedIn, updateBorrower);
router.delete("/users/:id", isLoggedIn, (req, res) => {
  res.send("User deleted");
});
// router.delete("/borrowers/:id", signInAdmin, deleteBorrower);

module.exports = router;
