const { SQLDataSource } = require("datasource-sql");

const MINUTE = 60;

class MyDatabase extends SQLDataSource {
  ShowShops() {
    return this.knex
      .select("*")
      .from("shops")
      .cache(MINUTE);
  };
  ShowCategories(ids) {
    return this.knex
      .select("*")
      .from("productCategories")
      .whereIn('id', ids)
      .cache(MINUTE);
  };
  ShowPreviewCategories(ids) {
    return this.knex
      .select("*")
      .from("productPreviewCategories")
      .whereIn('id', ids)
      .cache(MINUTE);
  };
  ShowItems(ids) {
    return this.knex
      .select("*")
      .from("products")
      .whereIn('id', ids)
      .cache(MINUTE);
  };
}

module.exports = MyDatabase;
