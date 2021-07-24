export const userTypeDef = `
  type User {
      id: Int!
      user_name: String!
      user_password: String!
      user_email: String!
      user_real_name: String!
  }
  input UserInput {
    user_name: String!
    user_password: String!
    user_email: String!
    user_real_name: String!
  }`;

export const userQueries = `
      allUsers: [User]!
      userById(id: Int!): User!
  `;

export const userMutations = `
    createUser(user: UserInput!): User!
    updateUser(id: Int!, user: UserInput!): User!
    deleteUser(id: Int!): Int
`;


