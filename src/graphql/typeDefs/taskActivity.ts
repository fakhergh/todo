import { gql } from 'apollo-server-express';

export const TaskActivity = gql`
  enum TaskActivityAction {
    TASK_CREATION
    TITLE_UPDATE
    DESCRIPTION_UPDATE
    TASK_ASSIGNMENT
    NEW_COMMENT
  }

  union TaskActivity =
      TaskCreationActivity
    | StatusUpdateTaskActivity
    | TitleUpdateTaskActivity
    | DescriptionUpdateTaskActivity
    | TaskAssignmentActivity
    | NewCommentTaskActivity

  type TitleMetaData {
    previousTitle: String
    newTitle: String
  }

  type DescriptionMetaData {
    previousDescription: String
    newDescription: String
  }

  type StatusUpdateTaskActivity {
    id: ID!
    author: User!
    task: Task!
    previousStatus: TaskStatus!
    newStatus: TaskStatus!
    createdAt: Float!
  }

  type TaskCreationActivity {
    id: ID!
    author: User!
    task: Task!
    createdAt: Float!
  }

  type TitleUpdateTaskActivity {
    id: ID!
    author: User!
    task: Task!
    previousTitle: String!
    newTitle: String!
    createdAt: Float!
  }

  type DescriptionUpdateTaskActivity {
    id: ID!
    author: User!
    task: Task!
    previousDescription: String!
    newDescription: String!
    createdAt: Float!
  }

  type TaskAssignmentActivity {
    id: ID!
    author: User!
    task: Task!
    assignee: User!
    createdAt: Float!
  }

  type NewCommentTaskActivity {
    id: ID!
    author: User!
    task: Task!
    createdAt: Float!
  }
`;
