const Book = require('../../mongomodels/Books');

exports.removeBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { is_deleted: true },
      { new: true }
    );

    if (!book) {
      return res
        .status(404)
        .json({ success: false, message: "Book not found." });
    }

    res
      .status(200)
      .json({ success: true, message: "Book deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};
