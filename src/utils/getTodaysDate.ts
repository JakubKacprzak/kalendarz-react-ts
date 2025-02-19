const currentDate: Date = new Date();

export const getTodaysDate = (): {
  currentDay: number;
  dayOfTheWeek: number;
  currentMonth: number;
  currentYear: number;
} => {
  const currentDay: number = currentDate.getDate();
  const dayOfTheWeek: number = currentDate.getDay();
  const currentMonth: number = currentDate.getMonth();
  const currentYear: number = currentDate.getFullYear();

  return { currentDay, dayOfTheWeek, currentMonth, currentYear };
};
