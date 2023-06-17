const { getKnex, tables } = require("../data/index");

const getAll = async () => {
  const products = await getKnex()(tables.product);
  return products;
};

const getByIds = async (productId) => {
  const products = getKnex()(tables.product);
  if (productId) {
    products.whereIn("product_id", productId);
  }
  return products;
};

const getFilteredProducts = async (
  name,
  startPrice,
  endPrice,
  inStock,
  brand,
  category,
  limit,
  skip,
  sortBy
) => {
  const products = getKnex()(tables.product);
  if (name) {
    products.whereILike("name", `%${name}%`);
  }
  if (inStock) {
    products.where("stock", ">", 0);
  }
  products.whereBetween("price", [startPrice, endPrice]);
  if (category) {
    products.whereIn("category", category);
  }
  if (brand) {
    products.whereIn("brand", brand);
  }
  if (limit) {
    products.limit(limit);
  }
  products.offset(skip);
  if (sortBy) {
    products.orderBy(`${tables.product}.${sortBy}`);
  }
  return products;
};

const getSortItems = async () => {
  const categories = await getKnex()(tables.product)
    .select("category")
    .distinct();
  return categories;
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

const getPopularProducts = async () => {
  const popular = await getKnex()(tables.order_line)
    .select('PRODUCT_product_id')
    .sum('product_count AS amount')
    .groupBy('PRODUCT_product_id')
    .orderBy('amount', 'DESC')
    .limit(10)
  const popular_ids = popular.map(e => e.PRODUCT_product_id);
  console.log(popular_ids);
  return await getByIdsOrdered(popular_ids)
}

const getByIdsOrdered = async (productId) => {
  const products = getKnex()(tables.product);
  if (productId) {
    products.whereIn("product_id", productId).orderByRaw(`FIELD(product_id, ${productId.join(',')})`);
  }
  return products;
};

module.exports = {
  getAll,
  getByIds,
  getFilteredProducts,
  getSortItems,
  getCategories,
  getBrands,
  getHighestPrice,
  getPopularProducts,
};
