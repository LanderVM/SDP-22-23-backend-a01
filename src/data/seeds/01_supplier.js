const { tables } = require("../index");

module.exports = {
  seed: async (knex) => {
    await knex(tables.carrier).insert([
      {
       supplier_id:1 ,
       address:"Timlaan 24 1000 Brussel" ,
       email:"tim@mail.com" ,
       name:"Tim CO" ,
       phone_number:72992393 ,
      },
      {
        supplier_id:2 ,
        address:"Janstraat 12 9000 Aalst" ,
        email:"jan@mail.com" ,
        name:"Jan INC" ,
        phone_number: 79316618,
      },
      {
        supplier_id:3 ,
        address:"Berkstraat 77 7000 Gent" ,
        email:"sonians@mail.com" ,
        name:"Sonians INC" ,
        phone_number: 79316618,
      },
      
    ]);
  },
};
