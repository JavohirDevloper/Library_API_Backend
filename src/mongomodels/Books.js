const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    publisher: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Publisher",
      required: false,
    },
    author: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Author",
      required: false,
    },
    copies: {
      type: mongoose.SchemaTypes.Number,
      default: 0,
    },
    is_deleted: {
      type: mongoose.SchemaTypes.Boolean,
      default: false,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
