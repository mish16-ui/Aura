export const getDeadlineStatus = (deadline, reminderMinutes) => {
  if (!deadline) return { isApproaching: false, timeLeft: null };

  const now = new Date();
  const target = new Date(deadline);
  const diffMs = target - now;
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins <= 0) return { isApproaching: false, isOverdue: true, timeLeft: "Overdue" };

  // Check if we are within the reminder window
  const isApproaching = diffMins <= reminderMinutes;

  const hours = Math.floor(diffMins / 60);
  const mins = diffMins % 60;
  const timeLeft = hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;

  return { isApproaching, isOverdue: false, timeLeft };
};

export const reminderOptions = [
  { label: 'No reminder', value: 0 },
  { label: '30 minutes before', value: 30 },
  { label: '1 hour before', value: 60 },
  { label: '3 hours before', value: 180 },
  { label: '24 hours before', value: 1440 },
];