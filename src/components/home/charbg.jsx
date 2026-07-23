import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { getDataDashboard } from "../../feature/slice/dashboardSlice";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

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
  const data2 = useSelector((state) => state.DashboardData?.dashboard);
  const { i18n } = useTranslation();
  const lang = i18n.language;

  useEffect(() => {
    dispatch(getDataDashboard());
  }, [dispatch]);

  const dataMonthlyTarget = data2?.projectStatistics;

  // 🟢 1. حماية البيانات المرجعة بقيم افتراضية مصفوفات []
  const titleText = dataMonthlyTarget?.title?.[lang] || "";
  const labels = dataMonthlyTarget?.categories?.[lang] || [];
  const labelsList = dataMonthlyTarget?.series?.[0]?.data || [];
  const labelsName = dataMonthlyTarget?.series?.[0]?.name?.[lang] || "";
  const labelsList2 = dataMonthlyTarget?.series?.[1]?.data || [];
  const labelsName2 = dataMonthlyTarget?.series?.[1]?.name?.[lang] || "";

  // 🟢 2. إعدادات متغيرات الـ Dark Mode
  const isDarkMode = document.documentElement.classList.contains("dark");
  const textColor = isDarkMode ? "#f8fafc" : "#475569";
  const gridColor = isDarkMode ? "#334155" : "#e2e8f0";

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        position: lang === "ar" ? "right" : "left",
        beginAtZero: true,
        min: 0,
        max: 300,
        ticks: {
          stepSize: 30,
          color: textColor, // 👈 تغيير لون الأرقام للداكن
          font: {
            size: 12,
            family: "inherit",
          },
          callback: function (value) {
            return `${value} ${lang === "ar" ? "ساعة" : "hrs"}`;
          },
        },
        grid: {
          color: gridColor, // 👈 شبكة تتكيف مع الثيم
          z: -1,
          drawBorder: false,
        },
      },
      x: {
        ticks: {
          color: textColor, // 👈 أسماء الشهور/الأيام تظهر في الليل
          font: {
            family: "inherit",
          },
        },
        grid: {
          color: gridColor,
          z: -1,
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: textColor, // 👈 أسماء الـ Datasets تظهر بلون مناسب
          font: {
            family: "inherit",
          },
        },
      },
      title: {
        display: true,
        text: titleText,
        color: textColor, // 👈 العنوان الرئيسي
        font: {
          size: 16,
          family: "inherit",
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: isDarkMode ? "#1e293b" : "#0f172a",
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
        borderColor: isDarkMode ? "#475569" : "transparent",
        borderWidth: 1,
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: labelsName,
        data: labelsList,
        backgroundColor: "rgb(255, 99, 132)",
        barPercentage: 0.6,
        categoryPercentage: 0.8,
        borderRadius: 4, // 👈 تدوير زوايا الأشرطة شكلها بيبقى أرق
      },
      {
        label: labelsName2,
        data: labelsList2,
        backgroundColor: "rgb(53, 162, 235)",
        barPercentage: 0.6,
        categoryPercentage: 0.8,
        borderRadius: 4,
      },
    ],
  };

  return (
    <div className="w-full h-full p-4">
      <Bar options={options} data={data} />
    </div>
  );
}
