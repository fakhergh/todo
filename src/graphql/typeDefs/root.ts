import { gql } from 'apollo-server-express';

export const Root = gql`
  directive @withAuth on QUERY | FIELD_DEFINITION

  type PageInfo {
    endCursor: String
    hasNextPage: Boolean
  }

  type Query {
    dummy: String
  }

  type Mutation {
    dummy: String
  }
`;
