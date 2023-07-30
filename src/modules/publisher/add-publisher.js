const Publisher = require("../../mongomodels/Publisher");

const addPublish = async (data) => {
  const { name, address, phone } = data;

  const existingPublisher = await Publisher.findOne({ name });

  const publisher = new Publisher({
    name,
    address,
    phone,
  });
  publisher.save();

  return publisher;
};

module.exports = addPublish;
