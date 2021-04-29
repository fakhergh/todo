const mongooseSchemaOptions = {
  timestamps: true,
  versionKey: false,
};

const TaskStatusByKey = {
  open: 'OPEN',
  inProgress: 'IN_PROGRESS',
  done: 'DONE',
};

const TaskStatus = Object.values(TaskStatusByKey);

const TaskActivityActionByKey = {
  taskCreation: 'TASK_CREATION',
  titleUpdate: 'TITLE_UPDATE',
  descriptionUpdate: 'DESCRIPTION_UPDATE',
  taskAssignment: 'TASK_ASSIGNMENT',
  newComment: 'NEW_COMMENT',
  statusChange: 'STATUS_CHANGE',
};

const TaskActivityActions = Object.values(TaskActivityActionByKey);

const GraphQlErrors = {
  UnAuthenticatedException: 'UnAuthenticatedException',
  UnauthorizedException: 'UnauthorizedException',
  TaskNotExistsException: 'TaskNotExistsException',
  UserDuplicationException: 'UserDuplicationException',
  InvalidCredentialsException: 'InvalidCredentialsException',
};

module.exports = {
  mongooseSchemaOptions,
  GraphQlErrors,
  TaskActivityActionByKey,
  TaskActivityActions,
  TaskStatusByKey,
  TaskStatus,
};
