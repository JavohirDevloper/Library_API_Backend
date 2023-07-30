const Book = require('../../mongomodels/Books');

exports.editBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res
        .status(404)
        .json({ success: false, message: "Book not found." });
    }

    if (req.method === "GET") {
      await book
        .populate("publisher", "name")
        .populate("author", "name")
        .execPopulate();

      return res.status(200).json({ success: true, data: book });
    }

    book.title = req.body.title || book.title;
    book.publisher = req.body.publisher || book.publisher;
    book.author = req.body.author || book.author;
    book.copies = req.body.copies || book.copies;

    await book.save();

    res
      .status(200)
      .json({ success: true, message: "Book updated successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};
