export const providerTypeDef = `
  type Provider {
      id: Int!
      nit: Int!
      name: String!
      description: String!
  }
  input ProviderInput {
      nit: Int!
      name: String!
      description: String!
  }`;

export const providerQueries = `
      allProviders: [Provider]!
      providerById(id: Int!): Provider!
  `;

export const providerMutations = `
    createProvider(provider: ProviderInput!): Provider!
    updateProvider(id: Int!, provider: ProviderInput!): Provider!
    deleteProvider(id: Int!): Int
`;
