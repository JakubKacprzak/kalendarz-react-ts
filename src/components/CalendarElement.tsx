import { useState } from "react";
import { getMonthData } from "../utils/getMonthData";
import { changeToPrevMonth } from "../utils/changeToPrevMonth";
import { changeToNextMonth } from "../utils/changeToNextMonth";
import { ArrowLeft, ArrowRight } from "lucide-react";

const daysOfTheWeek: string[] = [
  "Pon",
  "Wto",
  "Śro",
  "Czw",
  "Pią",
  "Sob",
  "Nie",
];
const monthsOfTheYear: string[] = [
  "Styczeń",
  "Luty",
  "Marzec",
  "Kwiecień",
  "Maj",
  "Czerwiec",
  "Lipiec",
  "Sierpień",
  "Wrzesień",
  "Październik",
  "Listopad",
  "Grudzień",
];

const calendarGrid = (
  firstDay: number,
  daysInMonth: number,
  previousMonthData: { daysInMonth: number }
): { day: string; isCurrMonth: boolean }[][] => {
  const grid: { day: string; isCurrMonth: boolean }[][] = [];
  let week: { day: string; isCurrMonth: boolean }[] = [];

  for (let i = firstDay; i > 0; i--) {
    week.push({
      day: String(previousMonthData.daysInMonth - i),
      isCurrMonth: false,
    });
  }

  for (let day = 1; day <= daysInMonth; day++) {
    week.push({ day: String(day), isCurrMonth: true });
    if (week.length === 7) {
      grid.push(week);
      week = [];
    }
  }

  let nextMonthDays = 1;

  while (week.length < 7) {
    week.push({ day: String(nextMonthDays++), isCurrMonth: false });
  }

  grid.push(week);

  return grid;
};

console.log(getMonthData(new Date(2026, 1)));

export const CalendarElement = () => {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const handleDayClick = (day: string) => {
    setSelectedDay(day);
  };

  const handlePrevMonthClick = () => {
    setCurrentDate(changeToPrevMonth(currentDate));
  };

  const handleNextMonthClick = () => {
    setCurrentDate(changeToNextMonth(currentDate));
  };

  const currentMonthData = getMonthData(currentDate);
  const previousMonthDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 1,
    1
  );

  const previousMonthData = getMonthData(previousMonthDate);

  return (
    <div className="p-4 w-max mx-auto rounded-xl bg-white select-none">
      <table className="table-fixed w-md">
        <caption className="caption-top font-bold py-2">
          <div className="flex justify-center gap-4">
            <ArrowLeft
              className="cursor-pointer"
              onClick={handlePrevMonthClick}
            />
            <span>{`${
              monthsOfTheYear[currentDate.getMonth()]
            } ${currentDate.getFullYear()}`}</span>
            <ArrowRight
              className="cursor-pointer"
              onClick={handleNextMonthClick}
            />
          </div>
        </caption>
        <thead>
          <tr>
            {daysOfTheWeek.map((day) => (
              <th key={day} className="py-3 font-medium text-gray-500">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-center cursor-pointer">
          {calendarGrid(
            currentMonthData.firstDay,
            currentMonthData.daysInMonth,
            previousMonthData
          ).map((week, weekIndex) => (
            <tr key={weekIndex}>
              {week.map(({ day, isCurrMonth }, dayIndex) => (
                <td
                  key={dayIndex}
                  className={`py-3 font-medium transition-colors duration-200 ${
                    isCurrMonth ? "text-black" : "text-gray-400 bg-gray-100"
                  } ${
                    isCurrMonth && selectedDay === day
                      ? "bg-black text-white"
                      : ""
                  }`}
                  onClick={isCurrMonth ? () => handleDayClick(day) : undefined}
                >
                  {day}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
