export const changeToPrevMonth = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth() - 1, 1);
};
