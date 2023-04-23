const orderRepository = require("../repository/order");
const ServiceError = require("../core/serviceError");

const getByTrackingCodes = async (trackAndTraceCode, verificatiecode) => {
  const verificationType =
    await orderRepository.getVerificationTypeByTrackAndTraceCode(
      trackAndTraceCode
    );

  if (!verificationType) {
    throw ServiceError.notFound(
      `There is no order with track and trace code "${trackAndTraceCode}" and verification code "${verificatiecode}"`
    );
  }

  switch (verificationType.verification_type) {
    case "POST_CODE":
      order = await orderRepository.getBypostalCode(
        trackAndTraceCode,
        verificatiecode
      );
      break;
    case "ORDER_ID":
      order = await orderRepository.getByOrderId(
        trackAndTraceCode,
        verificatiecode
      );
  }

  if (!order) {
    throw ServiceError.notFound(
      `There is no order with track and trace code "${trackAndTraceCode}" and verification code "${verificatiecode}"`
    );
  }
  return {
    items: order,
    count: order.length,
  };
};


const create = async ({email,products,address}) =>{
  const supplierCustomer = {supplier_id:3}//await supplierRepository.findSupplierByUserEmail(email);
  
  const street = address.street;
  const number = address.number;
  const postalCode = address.postalCode;
  const country = address.country;
  
  const addressString = street.concat(' ').concat(number).concat(' ').concat(postalCode).concat(' ').concat(country);
  
  let date = new Date();
  date = date.toISOString().split('T')[0];
  
  const suppliers = {1:[{productId:1,amount:5},{productId:2,amount:5}],2:[{productId:4,amount:5},{productId:5,amount:5}]}//await organizeProducts(products);
  
  console.log(suppliers);
  orders = [];
  orderObjects = [];

  Object.keys(suppliers).forEach(async el=>{

    orderId = await orderRepository.create(supplierCustomer.supplier_id,addressString,date,el);
    orders.push(orderId);

    products = suppliers[el];

    products.forEach(async el => {
      price = await productRepository.getById(el.productId).price;//bug: price is NaN
      totalPrice = price * el.amount;
      console.log(`prijs=${price}`);
      console.log(`totale prijs=${totalPrice}`);
      await orderLineRepository.create(orderId,el.productId,el.amount,totalPrice,);
    })

  })
  /*
  orders.forEach(async el => {
    order = await orderRepository.findById(el);
    orderObjects.push(order);
  });
  
  return orderObjects;*/
}

const organizeProducts = async (products) => {
  let suppliers = {};
  products.forEach(async element => {

    supplierId = await supplierRepository.findSupplierByProductId(element.productId);
    if (!Object.keys(supplier).includes(supplierId)) {
      
      suppliers = {...suppliers,supplierId:[element]};
    } else {
      suppliers.supplierId.push(element);
    }
  });
  return suppliers;
}


module.exports = {
  getByTrackingCodes,create,
};
