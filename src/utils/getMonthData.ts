export const getMonthData = (
  date: Date
): {
  daysInMonth: number;
  firstDay: number;
  lastDay: number;
} => {
  const year: number = date.getFullYear();
  const month: number = date.getMonth();

  const daysInMonth: number = new Date(year, month + 1, 0).getDate();
  const firstDay: number = new Date(year, month, 0).getDay();
  const lastDay: number = new Date(year, month, daysInMonth).getDay();

  return { daysInMonth, firstDay, lastDay };
};
