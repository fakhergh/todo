export const mongooseSchemaOptions = {
  timestamps: true,
  versionKey: false,
};

export const TaskStatusByKey = {
  open: 'OPEN',
  inProgress: 'IN_PROGRESS',
  done: 'DONE',
};

export const TaskStatus = Object.values(TaskStatusByKey);

export const TaskActivityActionByKey = {
  taskCreation: 'TASK_CREATION',
  titleUpdate: 'TITLE_UPDATE',
  descriptionUpdate: 'DESCRIPTION_UPDATE',
  taskAssignment: 'TASK_ASSIGNMENT',
  newComment: 'NEW_COMMENT',
  statusChange: 'STATUS_CHANGE',
};

export const TaskActivityActions = Object.values(TaskActivityActionByKey);

export const GraphQlErrors = {
  UnAuthenticatedException: 'UnAuthenticatedException',
  UnauthorizedException: 'UnauthorizedException',
  TaskNotExistsException: 'TaskNotExistsException',
  UserDuplicationException: 'UserDuplicationException',
  InvalidCredentialsException: 'InvalidCredentialsException',
};
