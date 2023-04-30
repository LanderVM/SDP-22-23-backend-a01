const { getKnex, tables } = require("../data/index");

const getAll = async () => {
  const products = await getKnex()(tables.product);
  return products;
};

const getById = async (id) => {
  const product = await getKnex()(tables.product)
    .where("product_id", id)
    .first();
  return product;
};

const getByName = async (name) => {
  const product = await getKnex()(tables.product).where("name", name).first();
  return product;
};

const getFilteredProducts = async (
  startPrice,
  endPrice,
  inStock,
  brand,
  category,
  limit,
  skip,
) => {
  const products = getKnex()(tables.product);
  if (inStock) {
    products.where("stock", ">", 0);
  } else {
    products.where("stock", "=", 0);
  }
  if (startPrice != null && endPrice != null) {
    products.whereBetween("price", [startPrice, endPrice]);
  }
  if (typeof(category[0]) == "object") {
    products.whereIn("category", category[0])
  } 
  if (typeof(category[0]) === "string") {
    products.where("category", category[0])
    console.log(category[0])
  }
  if (typeof(brand[0]) == "object") {
    products.whereIn("brand", brand[0])
  } 
  if (typeof(brand[0]) === "string") {
    products.where("brand", brand[0])
  }
  if (limit) {
    products.limit(limit);
  }
  products.offset(skip);
  return products;
};

const getCategories = async () => {
  const categories = await getKnex()(tables.product)
    .select("category")
    .distinct();
  return categories;
};

const getBrands = async () => {
  const brands = await getKnex()(tables.product).select("brand").distinct();
  return brands;
};

const getHighestPrice = async () => {
  const highestPrice = await getKnex()(tables.product)
    .max({ price: "price" })
    .first();
  return highestPrice;
};

const getByBrand = async (brand) => {
  const product = await getKnex()(tables.product).where("brand", brand);
  return product;
};

const getByCategory = async (category) => {
  const product = await getKnex()(tables.product).where("category", category);
  return product;
};

module.exports = {
  getAll,
  getById,
  getByName,
  getFilteredProducts,
  getCategories,
  getBrands,
  getHighestPrice,
  getByBrand,
  getByCategory,
};
