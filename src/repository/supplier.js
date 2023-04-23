const { getKnex, tables } = require("../data/index");

const findSupplierByUserEmail = async (userEmail) => {
  console.log(userEmail);
  
  supplierId = await getKnex()(`${tables.user}`).join(`${tables.supplier}`,'user.SUPPLIER_supplier_id','=','supplier.supplier_id')
      .where("user.email",userEmail).select('supplier_id');//bug bij where clause

  return await findById(supplierId);
}

const findSupplierByProductId = async (productId) => {
  console.log(productId);
  supplierId = await getKnex()(`${tables.product}`).where('product_id',productId).select('supplier_id');//bug bij where clause
  return await findById(supplierId);
}

module.exports = {
  findSupplierByUserEmail,findSupplierByProductId,
}
