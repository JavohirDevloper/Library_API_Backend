const Book = require("../../mongomodels/Books");

exports.addBook = async (req, res) => {
  const publisher = await Book.findOne({ name: req.body.publisher });
  const author = await Book.findOne({ name: req.body.author });

  const book = new Book({
    title: req.body.title,
    publisher: publisher,
    author: author,
    copies: req.body.copies,
  });

  book
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};
