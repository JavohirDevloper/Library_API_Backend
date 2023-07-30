const Book = require('../../mongomodels/Books');

exports.listBooks = async (req, res) => {
  try {
    const { page = 1, limit = 10, q, filters = {}, sort = {} } = req.query;

    const skip = (page - 1) * limit;
    const search = q ? { title: { $regex: q, $options: "i" } } : {};

    const books = await Book.find({ ...search, ...filters })
      .populate("publisher", "name")
      .populate("author", "name")
      .sort({ [sort.by]: sort.order === "asc" ? 1 : -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const count = await Book.countDocuments({ ...search, ...filters });

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully.",
      data: books,
      currentPage: parseInt(page),
      totalPages: Math.ceil(count / limit),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};
