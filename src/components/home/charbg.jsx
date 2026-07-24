// استدعاء Hooks من Redux للتعامل مع الـ Store والـ Actions
import { useSelector, useDispatch } from "react-redux";

// استدعاء هوك الترجمة للتعامل مع اللغات المختلفة (ar/en)
import { useTranslation } from "react-i18next";

// استدعاء Effect لتشغيل الجلب عند التحميل الأول
import { useEffect } from "react";

// استدعاء الأكشن الخاص بطلب بيانات الداشبورد من الـ API
import { getDataDashboard } from "../../feature/slice/dashboardSlice";

// استدعاء وإعداد المكونات الأساسية لبناء الرسم البياني من مكتبة Chart.js
import {
  Chart as ChartJS,
  CategoryScale, // مقياس المحور السيني (فئات الشهور/الأيام)
  LinearScale, // مقياس المحور الصادي (الأرقام)
  BarElement, // عنصر الأشرطة البيانية (Bars)
  Title, // مكون عنوان الرسم البياني
  Tooltip, // مكون مربع التوضيح عند التمرير (Hover)
  Legend, // مكون دليل الألوان (الوسم الموضح للبيانات)
} from "chart.js";

// استدعاء المكون الرسومي الخاص بالأشرطة البيانية من مكتبة React wrapper
import { Bar } from "react-chartjs-2";

// تسجيل العناصر والمكونات المطلوبة داخل محرك Chart.js حتى يتمكن من رسمها
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export default function App() {
  const dispatch = useDispatch();

  // استخراج بيانات لوحة التحكم من الـ Redux Store
  const data2 = useSelector((state) => state.DashboardData?.dashboard);

  // استخراج اللغة الحالية من مكتبة الترجمة
  const { i18n } = useTranslation();
  const lang = i18n.language;

  // طلب البيانات فور تحميل المكون
  useEffect(() => {
    dispatch(getDataDashboard());
  }, [dispatch]);

  // استخراج قسم إحصائيات المشاريع من الكائن المرجعي للبيانات
  const dataMonthlyTarget = data2?.projectStatistics;

  // 🟢 1. حماية البيانات المرجعة بقيم افتراضية مصفوفات [] وتوزيع متغيرات البيانات طبقاً للغة الحالية
  const titleText = dataMonthlyTarget?.title?.[lang] || ""; // نص العنوان الرئيسي
  const labels = dataMonthlyTarget?.categories?.[lang] || []; // عناوين المحور السيني (مثل الأيام أو الأشهر)
  const labelsList = dataMonthlyTarget?.series?.[0]?.data || []; // قيم مجموعة البيانات الأولى (Series 1)
  const labelsName = dataMonthlyTarget?.series?.[0]?.name?.[lang] || ""; // اسم مجموعة البيانات الأولى حسب اللغة
  const labelsList2 = dataMonthlyTarget?.series?.[1]?.data || []; // قيم مجموعة البيانات الثانية (Series 2)
  const labelsName2 = dataMonthlyTarget?.series?.[1]?.name?.[lang] || ""; // اسم مجموعة البيانات الثانية حسب اللغة

  // 🟢 2. إعدادات متغيرات الـ Dark Mode الديناميكية
  // قراءة ما إذا كانت الصفحة في الوضع الداكن من خلال فئة dark المضافة لعنصر html
  const isDarkMode = document.documentElement.classList.contains("dark");
  const textColor = isDarkMode ? "#f8fafc" : "#475569"; // تحديد لون النصوص بناءً على المظهر
  const gridColor = isDarkMode ? "#334155" : "#e2e8f0"; // تحديد لون خطوط الشبكة بناءً على المظهر

  // كائن إعدادات الرسم البياني (Options Configuration)
  const options = {
    responsive: true, // تجاوب الرسم البياني مع حجم الشاشة
    maintainAspectRatio: false, // السماح للرسم البياني بالارتفاع المرن وملء الحاوية
    scales: {
      y: {
        // تغيير موقع المحور الصادي (يمين للعربي ويسار للإنجليزي)
        position: lang === "ar" ? "right" : "left",
        beginAtZero: true, // البدء من الصفر
        min: 0,
        max: 300,
        ticks: {
          stepSize: 30, // القفزة بين كل علامة وأخرى
          color: textColor, // تغيير لون الأرقام للداكن أو الفاتح
          font: {
            size: 12,
            family: "inherit", // استخدام نفس خط التطبيق
          },
          // تخصيص النص المعروض مع الأرقام (ساعة أو hrs)
          callback: function (value) {
            return `${value} ${lang === "ar" ? "ساعة" : "hrs"}`;
          },
        },
        grid: {
          color: gridColor, // شبكة تتكيف مع الثيم
          z: -1, // إخفاء الخطوط خلف الأشرطة البيانية
          drawBorder: false,
        },
      },
      x: {
        ticks: {
          color: textColor, // أسماء الشهور/الأيام تظهر بلون متكيف مع المظهر
          font: {
            family: "inherit",
          },
        },
        grid: {
          color: gridColor, // لون خطوط الشبكة الأفقية
          z: -1,
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: textColor, // أسماء الـ Datasets تظهر بلون مناسب للثيم
          font: {
            family: "inherit",
          },
        },
      },
      title: {
        display: true, // تفعيل عرض العنوان الرئيسي
        text: titleText, // النص المترجم للعنوان
        color: textColor, // لون خط العنوان
        font: {
          size: 16,
          family: "inherit",
        },
      },
      tooltip: {
        enabled: true, // تفعيل ظهور النوافذ المنبثقة عند التمرير
        backgroundColor: isDarkMode ? "#1e293b" : "#0f172a", // لون خلفية النافذة المنبثقة
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
        borderColor: isDarkMode ? "#475569" : "transparent",
        borderWidth: 1,
      },
    },
  };

  // كائن بيانات الرسم البياني (Data Configuration)
  const data = {
    labels, // محاور الفئات (X-Axis)
    datasets: [
      {
        label: labelsName, // اسم المجموعة الأولى
        data: labelsList, // القيم العددية للمجموعة الأولى
        backgroundColor: "rgb(255, 99, 132)", // اللون الوردي/الفيزيائي
        barPercentage: 0.6, // نسبة عرض الشريط مقارنة بالمساحة المتاحة
        categoryPercentage: 0.8,
        borderRadius: 4, // تدوير زوايا الأشرطة لتعطي مظهر أرق
      },
      {
        label: labelsName2, // اسم المجموعة الثانية
        data: labelsList2, // القيم العددية للمجموعة الثانية
        backgroundColor: "rgb(53, 162, 235)", // اللون الأزرق
        barPercentage: 0.6,
        categoryPercentage: 0.8,
        borderRadius: 4,
      },
    ],
  };

  return (
    <div className="w-full h-full p-4">
      {/* عرض مكون الرسم البياني مع تمرير كائنات الإعدادات والبيانات */}
      <Bar options={options} data={data} />
    </div>
  );
}
