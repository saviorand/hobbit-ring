const { extname } = require('path');
const { v4: uuid } = require('uuid'); 
const s3 = require('./s3'); 

module.exports = {
  Query: {
    shops: () => shops,
    shop(parent, args, context, info) {
      return shops.find(shop => (shop.id === Number(args.shopId)));
    },
    categories(parent, args, context, info) {
      return args.categoryIds.map(id => productCategories.find(category => (category.id === Number(id))));
    },
    category(parent, args, context, info) {
      return productCategories.find(category => category.id === Number(args.categoryId));
    },
    categoryContents(parent, args, context, info) {
      return args.contentIds.map(id => productPreviewCategories.find(content => (content.id === Number(id))));
    },
    categoryContent(parent, args, context, info) {
      return productPreviewCategories.find(content => content.id === Number(args.contentId));
    },
    productItems(parent, args, context, info) {
      return args.productIds.map(id => products.find(product => (product.id === Number(id))));
    },
    productItem(parent, args, context, info) {
      return products.find(product => product.id === Number(args.productId));
    },

  },
  Mutation: {
    uploadXML: async (_, { file }) => {
      const { createReadStream, filename, mimetype, encoding } = await file;

      const { Location } = await s3.upload({ // (C)
        Bucket: 'grecha-assets',
        Body: createReadStream(),               
        Key: `${uuid()}${extname(filename)}`,  
        ContentType: mimetype                   
      }).promise();                             

      return {
        filename,
        mimetype,
        encoding,
        uri: Location, 
      }; 
    },
  },
};