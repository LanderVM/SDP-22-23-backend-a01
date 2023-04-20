const { tables } = require("../index");

module.exports = {
  seed: async (knex) => {
    await knex(tables.tracking_code_details).insert([
      {
        tracking_code_details_id: 1,
        character_count: 13,
        is_integers_only: false,
        tracking_code_prefix: "testprefix",
        verification_type: "POST_CODE",
      },
      {
        tracking_code_details_id: 2,
        character_count: 10,
        is_integers_only: true,
        tracking_code_prefix: "32",
        verification_type: "ORDER_ID",
      },
    ]);
  },
};
