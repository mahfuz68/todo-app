import { motion } from "framer-motion";
import { format, addDays, startOfWeek, isSameDay } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface WeekStripProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function WeekStrip({
  selectedDate,
  onSelectDate,
}: WeekStripProps) {
  const [weekOffset, setWeekOffset] = useState(0);

  const today = new Date();
  const weekStart = startOfWeek(addDays(today, weekOffset * 7), {
    weekStartsOn: 1,
  });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const goToPrevWeek = () => setWeekOffset(weekOffset - 1);
  const goToNextWeek = () => setWeekOffset(weekOffset + 1);
  const goToToday = () => {
    setWeekOffset(0);
    onSelectDate(today);
  };

  return (
    <div className="bg-white rounded-card p-4 shadow-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="font-display font-semibold text-text-primary">
            Calendar
          </h3>
          {weekOffset !== 0 && (
            <button
              onClick={goToToday}
              className="text-xs text-primary hover:underline"
            >
              Today
            </button>
          )}
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={goToPrevWeek}
            className="p-2 rounded-lg hover:bg-surface-secondary"
          >
            <ChevronLeft size={20} className="text-text-secondary" />
          </button>
          <button
            onClick={goToNextWeek}
            className="p-2 rounded-lg hover:bg-surface-secondary"
          >
            <ChevronRight size={20} className="text-text-secondary" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((day, index) => {
          const isToday = isSameDay(day, today);
          const isSelected = isSameDay(day, selectedDate);

          return (
            <button
              key={index}
              onClick={() => onSelectDate(day)}
              className={`
                flex flex-col items-center py-3 rounded-button transition-all
                ${isSelected ? "bg-primary text-white" : "hover:bg-surface-secondary"}
                ${isToday && !isSelected ? "ring-2 ring-primary ring-inset" : ""}
              `}
            >
              <span
                className={`text-xs mb-1 ${isSelected ? "text-white/80" : "text-text-secondary"}`}
              >
                {days[index]}
              </span>
              <span
                className={`text-lg font-semibold ${isSelected ? "text-white" : "text-text-primary"}`}
              >
                {format(day, "d")}
              </span>
              {isToday && (
                <motion.div
                  layoutId="todayDot"
                  className={`w-1.5 h-1.5 rounded-full mt-1 ${isSelected ? "bg-white" : "bg-primary"}`}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
