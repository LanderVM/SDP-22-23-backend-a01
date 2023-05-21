const fs = require("fs");
const path = require("path");
const { tables } = require("../index");

module.exports = {
  seed: async (knex) => {
    const logoPath = path.join(__dirname, "blobLogo1.txt");

    const logoContent = fs.readFileSync(logoPath);
    const logoBuffer = Buffer.from(logoContent);

    await knex(tables.company_logo).insert([
      {
        logo_id: 1,
        LOGO: logoBuffer,
        SUPPLIER_supplier_id: 1,
      },
      {
        logo_id: 2,
        LOGO: logoBuffer,
        SUPPLIER_supplier_id: 2,
      },
    ]);
  },
};
