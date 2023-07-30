const Author = require("../../mongomodels/Author");

const addAuthor = async (name) => {
  const author = new Author({
    name,
  });
  author.save();

  return author;
};

module.exports = addAuthor;
