import { gql } from 'apollo-server-express';

export const Task = gql`
  enum TaskStatus {
    OPEN
    IN_PROGRESS
    DONE
  }

  type Task {
    id: ID!
    author: User!
    isViewerAuthor: Boolean!
    title: String!
    description: String
    status: TaskStatus!
    contributors: [User!]!
    activities: [TaskActivity!]!
    comments(cursor: String, first: Int): CommentConnection!
    createdAt: Float!
  }

  type TaskConnection {
    totalCount: Int!
    pageInfo: PageInfo!
    edges: [TaskEdge!]!
  }

  type TaskEdge {
    cursor: String!
    node: Task!
  }

  input TaskInput {
    title: String!
    description: String
    status: TaskStatus
  }

  extend type Query {
    getTaskById(id: ID!): Task @withAuth
    getTasks(cursor: String, first: Int): TaskConnection! @withAuth
  }

  extend type Mutation {
    addTask(input: TaskInput!): Task! @withAuth
    updateTask(id: ID!, input: TaskInput!): Task! @withAuth
    deleteTask(id: ID!): Task! @withAuth
    addContributorToTask(id: ID!, userId: ID!): Task! @withAuth
    removeContributorFromTask(id: ID!, userId: ID!): Task! @withAuth
  }
`;
