const { getKnex, tables } = require("../data/index");

const getByEmail = async (email) => {
  const user = await getKnex()(tables.user).select("*").where("email", email);
  return user;
};

module.exports = {
  getByEmail,
};
