const { gql } = require('apollo-server');

module.exports = gql`
  type File {
    uri: String!
    filename: String!
    mimetype: String!
    encoding: String!
  }
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
    uploads: [File]
    shops: [Shop]!
    shop(shopId: ID!): Shop
    categories(categoryIds: [ID]!): [Category]
    category(categoryId: ID!): Category
    categoryContents(contentIds: [ID]!): [CategoryPreview]
    categoryContent(contentId: ID!): CategoryPreview
    productItems(productIds: [ID]!): [ProductItem]
    productItem(productId: ID!): ProductItem
  }

  type Mutation {
    uploadXML(file: Upload!): File
  }
`;
