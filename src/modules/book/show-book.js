const Book = require('../../mongomodels/Books');

exports.showBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
      .populate('publisher', 'name')
      .populate('author', 'name');

    if (!book) {
      return res.status(404).json({ success: false, message: 'Book not found.' });
    }

    res.status(200).json({ success: true, data: book });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};