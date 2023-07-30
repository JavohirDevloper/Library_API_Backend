const express = require("express");
const { addLoan, listLoans, showLoan } = require("./_cotrollers");
const isLoggedIn = require("../../shared/auth/is-loggedin");

const router = express.Router();

router.post("/loan", isLoggedIn, addLoan);
router.get("/loans", isLoggedIn, listLoans);
router.get("/loans/:id", isLoggedIn, showLoan);

module.exports = router;
