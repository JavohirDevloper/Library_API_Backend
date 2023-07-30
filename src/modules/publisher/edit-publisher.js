const Publisher = require("../../mongomodels/Publisher");
const { NotFoundError } = require("../../shared/errors");

const editPublisher = async (id, body) => {
  const publisher = await Publisher.findByIdAndUpdate(id, body, { new: true });
  if (!publisher) {
    return new NotFoundError("Bunday Nashryotchi mavjud emas");
  }

  return publisher;
};
module.exports = {
  editPublisher,
};
