const express = require("express");
const router = express.Router();
const isLoggedIn = require("../../shared/auth/is-loggedin");
const {
  createAdmin,
  getAdmins,
  getAdminById,
  updateAdmin,
  updateOwnAdmin,
  deleteAdmin,
  getDeletedAdmins,
} = require("./_controllers");
const signInAdmin = require("./login");
// const isLoggedIn = require("./login");

router.post("/login", isLoggedIn, signInAdmin);

router.post("/admins", createAdmin);
router.get("/admins", isLoggedIn, getAdmins);
router.get("/admins/:id", isLoggedIn, getAdminById);
router.patch("/admins/:id", isLoggedIn, updateAdmin);
router.put("/admins/own", isLoggedIn, updateOwnAdmin);
router.delete("/admins/deleted", isLoggedIn, getDeletedAdmins);
router.delete("/admins/:id", isLoggedIn, deleteAdmin);

module.exports = router;
