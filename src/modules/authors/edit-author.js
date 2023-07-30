const Author = require("../../mongomodels/Author");
const { NotFoundError } = require("../../shared/errors");

const editAuthor = async (id, body) => {
  const author = await Author.findByIdAndUpdate(id, body, { new: true });
  if (!author) {
    return new NotFoundError("Bunday yozuvchi yo'q");
  }

  return author;
};
module.exports = {
  editAuthor
}