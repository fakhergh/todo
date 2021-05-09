import { TaskActivityActionByKey } from '../../../constants';
import { ITaskActivity } from '../../../types';

const TypeByTaskActivityAction = {
  [TaskActivityActionByKey.taskCreation]: 'TaskCreationActivity',
  [TaskActivityActionByKey.titleUpdate]: 'TitleUpdateTaskActivity',
  [TaskActivityActionByKey.descriptionUpdate]: 'DescriptionUpdateTaskActivity',
  [TaskActivityActionByKey.taskAssignment]: 'TaskAssignmentActivity',
  [TaskActivityActionByKey.newComment]: 'NewCommentTaskActivity',
  [TaskActivityActionByKey.statusChange]: 'StatusUpdateTaskActivity',
};

export const TaskActivity = {
  __resolveType(taskActivity: ITaskActivity) {
    return TypeByTaskActivityAction[taskActivity.action];
  },
};
