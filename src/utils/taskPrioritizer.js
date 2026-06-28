/**
 * Sorts tasks based on:
 * 1. Completion status (Pending first)
 * 2. Priority (High > Medium > Low)
 * 3. Deadline (Earliest first)
 */
export const prioritizeTasks = (tasks) => {
  const priorityWeight = { High: 3, Medium: 2, Low: 1 };

  return [...tasks].sort((a, b) => {
    // 1. Completion status
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }

    // 2. Priority Weight
    if (priorityWeight[b.priority] !== priorityWeight[a.priority]) {
      return priorityWeight[b.priority] - priorityWeight[a.priority];
    }

    // 3. Deadline (if exists)
    if (a.deadline && b.deadline) {
      return new Date(a.deadline) - new Date(b.deadline);
    }

    return 0;
  });
};

/**
 * Formats tasks into a string context for the AI
 */
export const formatTasksForAI = (tasks) => {
  if (tasks.length === 0) return "The user currently has no tasks in their list.";

  return tasks.map((t, i) => (
    `${i + 1}. [${t.completed ? 'COMPLETED' : 'PENDING'}] ${t.title} 
       Priority: ${t.priority} | Deadline: ${t.deadline || 'No deadline'} | Duration: ${t.duration || 'Not set'}`
  )).join('\n');
};