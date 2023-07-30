const { Loan } = require("./_schema");

async function listLoans(req, res) {
  try {
    const { bookId, adminId, borrowerId, returned } = req.query;
    const conditions = {};

    if (bookId) {
      conditions.book = bookId;
    }

    if (adminId) {
      conditions.admin = adminId;
    }

    if (borrowerId) {
      conditions.borrower = borrowerId;
    }

    if (returned) {
      conditions.returned_date =
        returned === "true" ? { $exists: true } : { $exists: false };
    }

    const pageSize = 10;
    const page = parseInt(req.query.page) || 1;
    const count = await Loan.countDocuments(conditions);
    const loans = await Loan.find(conditions)
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .populate("book")
      .populate("borrower")
      .populate("admin")
      .sort({ out_date: "desc" });

    return res
      .status(200)
      .json({ loans, page, pages: Math.ceil(count / pageSize) });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}

module.exports = { listLoans };
