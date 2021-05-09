import { gql } from 'apollo-server-express';

export const User = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    displayName: String!
    email: String!
    createdAt: Float!
  }

  input SignInInput {
    email: String!
    password: String!
  }

  input SignUpInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }

  extend type Mutation {
    signIn(input: SignInInput!): String!
    signUp(input: SignUpInput!): String!
  }
`;
