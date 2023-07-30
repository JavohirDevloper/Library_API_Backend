const { Loan } = require("./schema");

async function showLoan(req, res) {
  try {
    const loan = await Loan.findById(req.params.id)
      .populate("book")
      .populate("borrower")
      .populate("admin");

    if (!loan) {
      return res.status(404).json({ message: "Loan not found" });
    }

    return res.status(200).json({ loan });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}

module.exports = { showLoan };
