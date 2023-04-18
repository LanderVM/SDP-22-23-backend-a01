const config = require('config')

const { tables } = require('../../src/data');
const { withServer } = require('../helpers');

const data = {
    producten: [{
        product_id: 1,
        name: "test_product vijf",
        price: 11,
        stock: 5,
        description: "omschrijning test_product 5",
        photo: "https://cloudfront.alterego-design.com/media/catalog/product/cache/6/image/9df78eab33525d08d6e5fb8d27136e95/s/p/spano_black_newsite_01_4.jpg?_gl=1*51oyrg*_ga*MTM2NTk4Mjg3OC4xNjgxMjI0MDM5*_ga_Q3T21C0ST5*MTY4MTIyNDAzOC4xLjAuMTY4MTIyNDAzOC42MC4wLjA.&_ga=2.26334013.1693298657.1681224039-1365982878.1681224039",
        age: new Date(2023, 4, 10, 10, 10)
    },
    {
        product_id: 2,
        name: "test_product drie",
        price: 5,
        stock: 0,
        description: "omschrijning test_product 3",
        photo: "https://cloudfront.alterego-design.com/media/catalog/product/cache/6/image/9df78eab33525d08d6e5fb8d27136e95/s/p/spano_black_newsite_01_4.jpg?_gl=1*51oyrg*_ga*MTM2NTk4Mjg3OC4xNjgxMjI0MDM5*_ga_Q3T21C0ST5*MTY4MTIyNDAzOC4xLjAuMTY4MTIyNDAzOC42MC4wLjA.&_ga=2.26334013.1693298657.1681224039-1365982878.1681224039",
        age: new Date(2023, 4, 11, 10, 10)
    },
    {
        product_id: 3,
        name: "test_product vier",
        price: 9,
        stock: 6,
        description: "omschrijning test_product 3",
        photo: "https://cloudfront.alterego-design.com/media/catalog/product/cache/6/image/9df78eab33525d08d6e5fb8d27136e95/s/p/spano_black_newsite_01_4.jpg?_gl=1*51oyrg*_ga*MTM2NTk4Mjg3OC4xNjgxMjI0MDM5*_ga_Q3T21C0ST5*MTY4MTIyNDAzOC4xLjAuMTY4MTIyNDAzOC42MC4wLjA.&_ga=2.26334013.1693298657.1681224039-1365982878.1681224039",
        age: new Date(2023, 4, 12, 10, 10)
    }]
}

const dataToDelete = {
    producten: [1, 2, 3]
}

describe('product', ()  => {
	let request;
    let knex;
    let authHeader;

    withServer(({ knex: k, request: r, authHeader: a}) => {
        knex = k;
        request = r;
        authHeader = a;
    })

    const url = '/api/product';

	describe('GET /api/product', () => {
		beforeAll(async() => {
            await knex(tables.product).insert(data.producten)
        })

        afterAll(async() => {
            await knex(tables.product).whereIn('product_id', dataToDelete.producten).delete();
        })

        it('Zou een 200 code moeten geven en alle producten', async() => {
            const response = await request.get(url)
            expect(response.status).toBe(200);
            expect(response.body.items.length).toBe(3);
            expect(response.body.items[0]).toEqual({
                product_id: 1,
				name: "test_product vijf",
				price: 11,
				stock: 5,
				description: "omschrijning test_product 5",
				photo: "https://cloudfront.alterego-design.com/media/catalog/product/cache/6/image/9df78eab33525d08d6e5fb8d27136e95/s/p/spano_black_newsite_01_4.jpg?_gl=1*51oyrg*_ga*MTM2NTk4Mjg3OC4xNjgxMjI0MDM5*_ga_Q3T21C0ST5*MTY4MTIyNDAzOC4xLjAuMTY4MTIyNDAzOC42MC4wLjA.&_ga=2.26334013.1693298657.1681224039-1365982878.1681224039",
				age: new Date(2023, 4, 10, 10, 10).toJSON()     
            });
            expect(response.body.items[1]).toEqual({
                product_id: 2,
				name: "test_product drie",
				price: 5,
				stock: 0,
				description: "omschrijning test_product 3",
				photo: "https://cloudfront.alterego-design.com/media/catalog/product/cache/6/image/9df78eab33525d08d6e5fb8d27136e95/s/p/spano_black_newsite_01_4.jpg?_gl=1*51oyrg*_ga*MTM2NTk4Mjg3OC4xNjgxMjI0MDM5*_ga_Q3T21C0ST5*MTY4MTIyNDAzOC4xLjAuMTY4MTIyNDAzOC42MC4wLjA.&_ga=2.26334013.1693298657.1681224039-1365982878.1681224039",
				age: new Date(2023, 4, 11, 10, 10).toJSON()         
            });
            expect(response.body.items[2]).toEqual({
				product_id: 3,
				name: "test_product vier",
				price: 9,
				stock: 6,
				description: "omschrijning test_product 3",
				photo: "https://cloudfront.alterego-design.com/media/catalog/product/cache/6/image/9df78eab33525d08d6e5fb8d27136e95/s/p/spano_black_newsite_01_4.jpg?_gl=1*51oyrg*_ga*MTM2NTk4Mjg3OC4xNjgxMjI0MDM5*_ga_Q3T21C0ST5*MTY4MTIyNDAzOC4xLjAuMTY4MTIyNDAzOC42MC4wLjA.&_ga=2.26334013.1693298657.1681224039-1365982878.1681224039",
				age: new Date(2023, 4, 12, 10, 10).toJSON()
    		});
        })
	})

	describe('GET /api/product/productId/:id', () => {

        beforeAll(async () => {
            await knex(tables.product).insert(data.producten);
        });

        afterAll(async () => {
            await knex(tables.product).whereIn('product_id', dataToDelete.producten).delete();
        });

        it('De response zou 200 moeten zijn en je zou een product moeten krijgen', async () => {
            const response = await request.get(`${url}/productId/${data.producten[0].product_id}`);
            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                product_id: 1,
				name: "test_product vijf",
				price: 11,
				stock: 5,
				description: "omschrijning test_product 5",
				photo: "https://cloudfront.alterego-design.com/media/catalog/product/cache/6/image/9df78eab33525d08d6e5fb8d27136e95/s/p/spano_black_newsite_01_4.jpg?_gl=1*51oyrg*_ga*MTM2NTk4Mjg3OC4xNjgxMjI0MDM5*_ga_Q3T21C0ST5*MTY4MTIyNDAzOC4xLjAuMTY4MTIyNDAzOC42MC4wLjA.&_ga=2.26334013.1693298657.1681224039-1365982878.1681224039",
				age: new Date(2023, 4, 10, 10, 10).toJSON()   
            });
        });
    });

    describe('GET /api/product/filtered/:price/:inStock', () => {

        beforeAll(async () => {
            await knex(tables.product).insert(data.producten);
        });

        afterAll(async () => {
            await knex(tables.product).whereIn('product_id', dataToDelete.producten).delete();
        });

        it('De response zou 200 moeten zijn en je zou de gefilterde product(en) moeten krijgen (Het product moet minder of gelijk aan 10 euro kosten en in stock zijn)', async () => {
            const response = await request.get(`${url}/filtered/10/true`);
            expect(response.status).toBe(200);
            expect(response.body.items.length).toBe(1);
            expect(response.body.items[0]).toEqual({
                product_id: 3,
                name: "test_product vier",
                price: 9,
                stock: 6,
                description: "omschrijning test_product 3",
                photo: "https://cloudfront.alterego-design.com/media/catalog/product/cache/6/image/9df78eab33525d08d6e5fb8d27136e95/s/p/spano_black_newsite_01_4.jpg?_gl=1*51oyrg*_ga*MTM2NTk4Mjg3OC4xNjgxMjI0MDM5*_ga_Q3T21C0ST5*MTY4MTIyNDAzOC4xLjAuMTY4MTIyNDAzOC42MC4wLjA.&_ga=2.26334013.1693298657.1681224039-1365982878.1681224039",
                age: new Date(2023, 4, 12, 10, 10).toJSON()  
            });
        });
    });


})