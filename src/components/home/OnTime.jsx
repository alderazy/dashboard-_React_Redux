// استدعاء مكونات وحدات الأنيميشن من مكتبة Framer Motion
import { motion, useMotionValue, animate } from "motion/react";

// استدعاء React Hooks الأساسية لإنشاء Custom Hook مخصص للعداد
import { useEffect, useState } from "react";

// 🟢 Custom Hook مخصص للتحكم في تحريك الأرقام تدريجياً (Number Ticker Animation)
function useAnimatedNumber(value) {
  // State لتخزين القيمة الرقمية الحالية المعروضة على الشاشة
  const [displayValue, setDisplayValue] = useState(0);

  // إنشاء قيمة حركة مرنة عبر Framer Motion المخصصة للتتبع
  const count = useMotionValue(0);

  useEffect(() => {
    // بدء الأنيميشن للانتقال من القيمة الحالية إلى القيمة المستهدفة
    const controls = animate(count, value, {
      duration: 1.2, // مدة حركة الأنيميشن بالثواني
      ease: "easeOut", // نمط تباطؤ الحركة في النهاية
      onUpdate: (latest) => {
        setDisplayValue(Math.round(latest)); // 👈 تقريب الرقم الصحيح وإجبار المكون على إعادة الرسم (Re-render) مع كل تحديث
      },
    });

    // دالة التنظيف لإيقاف الأنيميشن فور إلغاء تحميل المكون أو تغير البيانات
    return () => controls.stop();
  }, [value, count]);

  // إرجاع الرقم المتحرك المستهدف
  return displayValue;
}

export default function CompletedProjectsCard({
  rate = 59, // قيمة معدل الالتزام بالمواعيد الافتراضية
  progress = 65, // نسبة المشاريع المكتملة الافتراضية
  rateTitle = "On Time Completed Rate", // العنوان الافتراضي لمعدل الالتزام
  progressTitle = "Completed Projects", // العنوان الافتراضي للمشاريع المكتملة
}) {
  // 🟢 تطبيق Custom Hook لتحريك الرقمين بشكل سلس ومتزامن
  const animatedRate = useAnimatedNumber(rate);
  const animatedProgress = useAnimatedNumber(progress);

  return (
    <div className="">
      {/* 1️⃣ الجزء العلوي: بطاقة معدل الالتزام بالمواعيد (Rate Tag) */}
      <div className="flex justify-between items-center">
        {/* عنوان معدل الالتزام */}
        <span className="text-[var(--text-heading)] font-semibold text-sm">
          {rateTitle}
        </span>

        {/* شارة نسبة الارتفاع الخضراء مع السهم والأرقام المتحركة */}
        <div className="bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-md flex items-center gap-1 text-xs font-bold">
          <span>↑</span>
          <span>{animatedRate}%</span>
        </div>
      </div>

      {/* 2️⃣ الجزء السفلي: شريط التقدم ونسبة المشاريع المكتملة (Progress & Bar) */}
      <div className="space-y-2">
        {/* عنوان ونسبة الإنجاز الرقمية المتحركة */}
        <div className="flex justify-between items-center">
          <span className="text-[var(--text)]  font-semibold text-sm">
            {progressTitle}
          </span>
          <span className="text-[var(--text)]  font-bold text-sm">
            {animatedProgress}%
          </span>
        </div>

        {/* شريط التعبئة البصري (Progress Bar) */}
        <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
          {/* عنصر الحركة المتحكم في التمدد من 0% إلى النسبة المحددة */}
          <motion.div
            className="bg-blue-600 dark:bg-blue-500 h-full rounded-full"
            initial={{ width: "0%" }} // العرض المبدئي عند تحميل المكون
            animate={{ width: `${progress}%` }} // العرض النهائي المستهدف
            transition={{ duration: 1.2, ease: "easeOut" }} // إعدادات توقيت تمدد الشريط
          />
        </div>
      </div>
    </div>
  );
}
