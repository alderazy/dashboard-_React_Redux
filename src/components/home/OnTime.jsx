import { motion, useMotionValue, animate } from "motion/react";
import { useEffect, useState } from "react";

// 🟢 هُوك صغير ومضمون 100% لأنيميشن الأرقام
function useAnimatedNumber(value) {
  const [displayValue, setDisplayValue] = useState(0);
  const count = useMotionValue(0);

  useEffect(() => {
    const controls = animate(count, value, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (latest) => {
        setDisplayValue(Math.round(latest)); // 👈 إجبار الـ Component يعمل Render مع كل رقم جديد
      },
    });

    return () => controls.stop();
  }, [value, count]);

  return displayValue;
}

export default function CompletedProjectsCard({
  rate = 59,
  progress = 65,
  rateTitle = "On Time Completed Rate",
  progressTitle = "Completed Projects",
}) {
  // 🟢 استدعاء الهوك للرقمين
  const animatedRate = useAnimatedNumber(rate);
  const animatedProgress = useAnimatedNumber(progress);

  return (
    <div className="">
      {/* 1️⃣ الجزء العلوي: Rate Tag */}
      <div className="flex justify-between items-center">
        <span className="text-[var(--text-heading)] font-semibold text-sm">
          {rateTitle}
        </span>
        <div className="bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-md flex items-center gap-1 text-xs font-bold">
          <span>↑</span>
          <span>{animatedRate}%</span>
        </div>
      </div>

      {/* 2️⃣ الجزء السفلي: Progress & Bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-[var(--text)]  font-semibold text-sm">
            {progressTitle}
          </span>
          <span className="text-[var(--text)]  font-bold text-sm">
            {animatedProgress}%
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
          <motion.div
            className="bg-blue-600 dark:bg-blue-500 h-full rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </div>
      </div>
    </div>
  );
}
