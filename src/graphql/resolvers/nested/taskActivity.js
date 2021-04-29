const { TaskActivityActionByKey } = require('../../../constants');

const TypeByTaskActivityAction = {
  [TaskActivityActionByKey.taskCreation]: 'TaskCreationActivity',
  [TaskActivityActionByKey.titleUpdate]: 'TitleUpdateTaskActivity',
  [TaskActivityActionByKey.descriptionUpdate]: 'DescriptionUpdateTaskActivity',
  [TaskActivityActionByKey.taskAssignment]: 'TaskAssignmentActivity',
  [TaskActivityActionByKey.newComment]: 'NewCommentTaskActivity',
  [TaskActivityActionByKey.statusChange]: 'StatusUpdateTaskActivity',
};

module.exports = {
  __resolveType(taskActivity) {
    return TypeByTaskActivityAction[taskActivity.action];
  },
};
