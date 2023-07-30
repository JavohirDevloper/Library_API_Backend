const { Loan } = require("./_schema");

async function addLoan(req, res) {
  try {
    const { bookId, borrowerId, dueDate } = req.body;
    const loan = new Loan({
      book: bookId,
      borrower: borrowerId,
      admin: req.user.id,
      due_date: dueDate || new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
    });
    await loan.save();
    return res.status(201).json({ message: "Loan added", loan });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}

module.exports = { addLoan };
