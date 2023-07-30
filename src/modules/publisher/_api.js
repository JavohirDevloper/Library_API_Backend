const express = require("express");
const {
  createPublisher,
  getPublishers,
  getPublisherById,
  updatePublisher,
  removePublisher,
} = require("./_controllers");
const isLoggedIn = require("../../shared/auth/is-loggedin");

const router = express.Router();

router.post("/publishers", isLoggedIn, createPublisher);
router.get("/publishers", isLoggedIn, getPublishers);
router.get("/publishers/:id", isLoggedIn, getPublisherById);
router.patch("/publishers/:id", isLoggedIn, updatePublisher);
router.delete("/publishers/:id", isLoggedIn, removePublisher);

module.exports = router;
