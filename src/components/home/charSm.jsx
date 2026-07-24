// استدعاء Hooks من Redux لإدارة وتتبع الحالة العامة (Store / Dispatch)
import { useSelector, useDispatch } from "react-redux";

// استدعاء هوك الترجمة للتعامل مع تغير اللغة الحالية (ar/en)
import { useTranslation } from "react-i18next";

// استدعاء Hook للآثار الجانبية لتشغيل طلب البيانات فور التحميل
import { useEffect } from "react";

// استدعاء دالة جلب بيانات لوحة التحكم من الـ Redux Slice
import { getDataDashboard } from "../../feature/slice/dashboardSlice";

// استدعاء وتجهيز العناصر الأساسية من مكتبة Chart.js الخاصة بالرسم البياني الدائري
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// استدعاء مكون الرسم البياني الدائري (Doughnut) من مكتبة React Wrapper
import { Doughnut } from "react-chartjs-2";

// تسجيل مكونات القطاعات الدائرية (Arc)، النوافذ المنبثقة (Tooltip)، ودليل الألوان (Legend) داخل المحرك
ChartJS.register(ArcElement, Tooltip, Legend);

export default function App() {
  const dispatch = useDispatch();

  // استخراج أوبجكت بيانات الداشبورد من الـ Redux Store
  const data2 = useSelector((state) => state.DashboardData?.dashboard);

  // استخراج لغة الواجهة المطبقة حالياً عبر مكتبة i18next
  const { i18n } = useTranslation();
  const lang = i18n.language;

  // التحقق مما إذا كان الوضع الداكن (Dark Mode) مفعلاً من خلال فئة dark على html
  const isDarkMode = document.documentElement.classList.contains("dark");

  // طلب جلب البيانات فور تحميل المكون لأول مرة
  useEffect(() => {
    dispatch(getDataDashboard());
  }, [dispatch]);

  // استخراج قسم الهدف الشهرى (Monthly Target) من البيانات المرجعة
  const monthlyTarget = data2?.monthlyTarget;
  const title = monthlyTarget?.title[lang]; // عنوان الرسم البياني المترجم
  const series = monthlyTarget?.series; // مصفوفة الأرقام والقيم (مثل: [75, 25])

  // تجميع المسميات المترجمة للقطاعات (مثل: مكتمل / قيد الانتظار)
  const labels = [
    monthlyTarget?.labels?.done[lang],
    monthlyTarget?.labels?.pending[lang],
  ];

  // تحديد ألوان النصوص والحدود ديناميكياً لتناسب الثيم الداكن أو الفاتح
  const textColor = isDarkMode ? "#f8fafc" : "#1e293b"; // أبيض/فاتح للداكن، وغامق للفاتح
  const sliceBorderColor = isDarkMode ? "#1e293b" : "#ffffff";

  // كائن البيانات الخاص بالـ Doughnut Chart
  const data = {
    labels: labels, // المسميات المعروضة في دليل الألوان (Done / Pending)
    datasets: [
      {
        label: title, // النص الموضح للبيانات عند التمرير
        data: series, // مصفوفة القيم العددية

        // ألوان خلفيات القطاعات بناءً على الثيم (الوردي والأزرق بدرجات مختلفة)
        backgroundColor: [
          isDarkMode ? "rgba(244, 63, 94, 0.5)" : "rgba(255, 99, 132, 0.6)",
          isDarkMode ? "rgba(59, 130, 246, 0.5)" : "rgba(54, 162, 235, 0.6)",
        ],

        // ألوان حدود القطاعات
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1, // سمك الإطار
      },
    ],
  };

  // كائن الإعدادات والتحكم في ظهور العناصر والـ Tooltips
  const options = {
    responsive: true, // تجاوب الرسم مع تغيير الحجم
    maintainAspectRatio: false, // مرونة الارتفاع لملء الحاوية
    plugins: {
      legend: {
        position: "bottom", // تموضع دليل الألوان أسفل الرسم البياني
        labels: {
          color: textColor, // تغيير لون كلام الـ Legend حسب الثيم
          font: {
            size: 13,
            family: "inherit", // اعتماد نفس خط المشروع
          },
          padding: 16, // مسافة الأمان حول دليل الألوان
        },
      },
      tooltip: {
        backgroundColor: isDarkMode ? "#334155" : "#ffffff", // خلفية نافذة التوضيح عند التمرير
        titleColor: isDarkMode ? "#f8fafc" : "#0f172a", // لون عنوان التولتيب
        bodyColor: isDarkMode ? "#cbd5e1" : "#334155", // لون محتوى النص التوضيحي
        borderColor: isDarkMode ? "#475569" : "#e2e8f0", // لون إطار النافذة المنبثقة
        borderWidth: 1,
      },
    },
  };

  // إرجاع مكون الرسم البياني الدائري مع تمرير البيانات والإعدادات
  return <Doughnut className="p-4" data={data} options={options} />;
}
