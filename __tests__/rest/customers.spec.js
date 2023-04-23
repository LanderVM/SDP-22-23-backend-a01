const supertest = require('supertest');
const createServer = require('../../src/createServer');
const {getKnex,tables} = require('../../src/data/index');

const data = {customers:[{
  email_id: "erik@janInc.com",
  username: "jan",
  SUPPLIER_supplier_id: 1,
},{
  email_id: "bert@timCo.com",
  username: "bert",
  SUPPLIER_supplier_id: 2,
},{
  email_id: "tyson@farma.com",
  username: "tyson",
  SUPPLIER_supplier_id: 3,
}],};

const dataToDelete = {
  customers: ["erik@janInc.com","bert@timCo.com","tyson@farma.com"],
}

describe('customers', () =>{

  let server;
  let request;
  let knex;

  beforeAll(async () => {
		server = await createServer();
		request = supertest(server.getApp().callback());
		knex = getKnex();
	})

  afterAll(async () => {
		await server.stop();
	});

  const url = '/api/customers';

  describe('GET api/customers',()=>{
    beforeAll( async ()=>{
      await knex(tables.customer).insert(data.customers);

    });
    afterAll(async () =>{
      await knex(tables.customer).whereIn('email_id',dataToDelete.customers).delete();
    });
  })
})