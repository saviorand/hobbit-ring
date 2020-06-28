const { xmlUploader } = require('./uploaders');

module.exports = {
  Query: {
    shops: async (_source, _args, { dataSources }) => {
      return dataSources.db.ShowShops();
    },
    /*shop: async (_source, { shopId }, { dataSources }) => {
      return dataSources.db.FindShop(shopId);
    },
    shopold(parent, args, context, info) {
      return shops.find(shop => (shop.id === Number(args.shopId)));
    },*/
    categories: async (_source, { categoryIds }, { dataSources }) => {
      return dataSources.db.ShowCategories(categoryIds);
    },
    /*category(parent, args, context, info) {
      return productCategories.find(category => category.id === Number(args.categoryId));
    },*/
    categoryPreviews: async (_source, { categoryPreviewIds }, { dataSources }) => {
      return dataSources.db.ShowPreviewCategories(categoryPreviewIds);
    },
    /*categoryContent(parent, args, context, info) {
      return productPreviewCategories.find(content => content.id === Number(args.contentId));
    },*/
    productItems: async (_source, { productIds }, { dataSources }) => {
      return dataSources.db.ShowItems(productIds);
    },
    /*productItem(parent, args, context, info) {
      return products.find(product => product.id === Number(args.productId));
    },*/

  },
  Mutation: {
    uploadXML: async (_, { file }) => {
      const { createReadStream, filename, mimetype, encoding } = await file;

      const uri = await xmlUploader.upload(createReadStream(), {
        filename,
        mimetype,
      });                           

      return {
        filename,
        mimetype,
        encoding,
        uri, 
      }; 
    },
  },
};