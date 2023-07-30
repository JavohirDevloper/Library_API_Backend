const mongoose = require("mongoose");

const loanSchema = new mongoose.Schema(
  {
    book: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Book",
      required: true,
    },
    out_date: {
      type: mongoose.SchemaTypes.Date,
      default: mongoose.now(),
      required: true,
    },
    due_date: {
      type: mongoose.SchemaTypes.Date,
      default: mongoose.now(),
      required: true,
    },
    admin: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Admin",
      required: true,
    },
    borrower: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Borrower",
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Loan = mongoose.model("Loan", loanSchema);

module.exports = Loan;
