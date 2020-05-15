const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  type Shop {
      id: ID!
      shopName: String!
      isAvailable: Boolean
      workingHours: String
      distanceTo: Int
      categories: [ID]!
  }
  type Category {
  	  id: ID!
      categoryName: String
      categoryContent: [ID]
  }
  type CategoryPreview {
  	  id: ID!
      categoryPreviewName: String!
      categoryPreviewContent: [ID]
  }
  type ProductItem {
  	  id: ID!
      productItemName: String!
      productPicture: String
      isInStock: Boolean
      quantityInStock: Int
      price: Float!
      weightIndicator: String
      contents: String
      about: String
      related: [ID]
      complementary: [ID]

  }
  type RelatedProduct {
      relatedProductName: String!
      relatedProductPicture: String
      relatedProductWeight: String
      relatedProductPrice: Float!
  }
  type ComplementaryProduct {
    complementaryProductName: String!
    complementaryProductPicture: String
    complementaryProductWeight: String
    complementaryProductPrice: Float!
  }
  type Query {
      shops: [Shop]!
      shop(shopId: ID!): Shop
      categories(categoryIds: [ID]!): [Category]
      category(categoryId: ID!): Category
      categoryContents(contentIds: [ID]!): [CategoryPreview]
      categoryContent(contentId: ID!): CategoryPreview
      productItems(productIds: [ID]!): [ProductItem]
      productItem(productId: ID!): ProductItem
      
  }
`;

const resolvers = {
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
};

const products = [
 {
 	id: 1,
 	productItemName: 'Сметана Боярская',
 	productPicture: 'https://vecherniy.kharkov.ua/i/2019/162310.jpg',
    isInStock: true,
    quantityInStock: 2,
    price: 13.37,
    weightIndicator: 'Упаковочка',
    contents: 'Сметана боярская в крапинку',
    about: 'Очень вкусный, свежий',

 },
 {
 	id: 2,
 	productItemName: 'Grechka vkusny',
 	productPicture: 'https://i.pinimg.com/736x/60/13/4b/60134bc4cb7125866a97a2a8a5aed52f.jpg',
    isInStock: false,
    quantityInStock: 0,
    price: 200.00,
    weightIndicator: 'Много',
    contents: 'Serious buckwheat wheat',
    about: 'Very good',

 },
{
 	id: 3,
 	productItemName: 'Пошехонский',
 	productPicture: 'https://i.pinimg.com/736x/60/13/4b/60134bc4cb7125866a97a2a8a5aed52f.jpg',
    isInStock: true,
    quantityInStock: 0,
    price: 200.00,
    weightIndicator: 'Много',
    contents: 'Serious cheese',
    about: 'Very good',

 },
 {
 	id: 4,
 	productItemName: 'Российский',
 	productPicture: 'https://i.pinimg.com/736x/60/13/4b/60134bc4cb7125866a97a2a8a5aed52f.jpg',
    isInStock: false,
    quantityInStock: 0,
    price: 200.00,
    weightIndicator: 'Много',
    contents: 'Serious russian cheese',
    about: 'Very good',
    related: [2, 3],
    complementary: [1],

 },
 {
 	id: 5,
 	productItemName: 'Молоко Простоквашино',
 	productPicture: 'https://i.pinimg.com/736x/60/13/4b/60134bc4cb7125866a97a2a8a5aed52f.jpg',
    isInStock: false,
    quantityInStock: 0,
    price: 125.01,
    weightIndicator: 'Много',
    contents: 'Serious russian cheese',
    about: 'Very good',

 },
{
 	id: 6,
 	productItemName: 'Клевер молоко',
 	productPicture: 'https://i.pinimg.com/736x/60/13/4b/60134bc4cb7125866a97a2a8a5aed52f.jpg',
    isInStock: false,
    quantityInStock: 0,
    price: 200.00,
    weightIndicator: 'Много',
    contents: 'Serious russian cheese',
    about: 'Very good',

 },
{
 	id: 7,
 	productItemName: 'Kaisersemmel',
 	productPicture: 'https://i.pinimg.com/736x/60/13/4b/60134bc4cb7125866a97a2a8a5aed52f.jpg',
    isInStock: false,
    quantityInStock: 0,
    price: 200.00,
    weightIndicator: 'Not much',
    contents: 'Serious semmel',
    about: 'Very good',

 },
 {
 	id: 8,
 	productItemName: 'Baguette',
 	productPicture: 'https://i.pinimg.com/736x/60/13/4b/60134bc4cb7125866a97a2a8a5aed52f.jpg',
    isInStock: true,
    quantityInStock: 0,
    price: 200.00,
    weightIndicator: 'A lot',
    contents: 'Serious Baguette',
    about: 'Very good',

 },
];

const productPreviewCategories = [
{     
	  id: 100,
      categoryPreviewName: 'Сыр',
	  categoryPreviewContent: [3, 4]

},
{     id: 200,
      categoryPreviewName: 'Молоко',
	  categoryPreviewContent: [5, 6]
},
{     id: 300,
      categoryPreviewName: 'Pastry',
	  categoryPreviewContent: [7, 8]
},
{     id: 400,
      categoryPreviewName: 'Соки',
	  categoryPreviewContent: []
},
{     id: 500,
      categoryPreviewName: 'Воды',
	  categoryPreviewContent: []
},
{     id: 600,
      categoryPreviewName: 'Salads',
	  categoryPreviewContent: []
},

]

const productCategories = [
  {   id: 1000,
      categoryName: 'Молочные продукты и всё',
      categoryContent: [100, 200],
  },
  {   id: 2000,
      categoryName: 'Прохладительные напитки',
      categoryContent: [400, 500],
  },
  {   id: 3000,
      categoryName: 'Fresh Produce',
      categoryContent: [300],
  },
  {   id: 4000,
      categoryName: 'Veggies and such',
      categoryContent: [600],
  },
]

const shops = [
{
	id: 10000,
    shopName: 'Лента',
    isAvailable: true,
    workingHours: 'Работает всегда',
    distanceTo: 23,
    categories: [1000, 2000],
},
{
	id: 20000,
    shopName: 'Billa',
    isAvailable: false,
    workingHours: 'Only in Austria',
    distanceTo: 1,
    categories: [3000, 4000],
},

];






const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});