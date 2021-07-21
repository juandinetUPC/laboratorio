export const productTypeDef = `
  type Product {
      id: Int!
      name: String!
      description: String!
      unit_measurement:String!
      quantity: Int!
      category: Category!
      provider: Provider!
      
  }
  input ProductInput {
      name: String!
      description: String!
      unit_measurement:String!
      quantity: Int!
      category: Int!
      provider: Int!
  }`;

export const productQueries = `
      allProducts: [Product]!
      productById(id: Int!): Product!
  `;

export const productMutations = `
    createProduct(product: ProductInput!): Product!
    updateProduct(id: Int!, product: ProductInput!): Product!
    deleteProduct(id: Int!): Int
`;
