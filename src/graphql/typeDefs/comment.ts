import { gql } from 'apollo-server-express';

export const Comment = gql`
  type Comment {
    id: ID!
    task: Task!
    author: User!
    isViewerAuthor: Boolean!
    content: String!
    createdAt: Float!
  }

  type CommentConnection {
    totalCount: Int!
    pageInfo: PageInfo!
    edges: [CommentEdge!]!
  }

  type CommentEdge {
    cursor: String!
    node: Comment!
  }

  input CommentInput {
    content: String!
  }

  extend type Mutation {
    addComment(taskId: ID!, input: CommentInput!): Comment! @withAuth
  }
`;
