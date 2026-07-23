import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { getDataDashboard } from "../../feature/slice/dashboardSlice";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function App() {
  const dispatch = useDispatch();
  const data2 = useSelector((state) => state.DashboardData?.dashboard);
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const isDarkMode = document.documentElement.classList.contains("dark");
  useEffect(() => {
    dispatch(getDataDashboard());
  }, [dispatch]);

  const monthlyTarget = data2?.monthlyTarget;
  const title = monthlyTarget?.title[lang];
  const series = monthlyTarget?.series;
  const labels = [
    monthlyTarget?.labels?.done[lang],
    monthlyTarget?.labels?.pending[lang],
  ];

  const textColor = isDarkMode ? "#f8fafc" : "#1e293b"; // أبيض/فاتح للداكن، وغامق للفاتح
  const sliceBorderColor = isDarkMode ? "#1e293b" : "#ffffff";
  const data = {
    labels: labels,
    datasets: [
      {
        label: title,
        data: series,
        backgroundColor: [
          isDarkMode ? "rgba(244, 63, 94, 0.5)" : "rgba(255, 99, 132, 0.6)",
          isDarkMode ? "rgba(59, 130, 246, 0.5)" : "rgba(54, 162, 235, 0.6)",
        ],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom", // أو top حسب تصميمك
        labels: {
          color: textColor, // 👈 تغيير لون كلام الـ Legend حسب الثيم
          font: {
            size: 13,
            family: "inherit",
          },
          padding: 16,
        },
      },
      tooltip: {
        backgroundColor: isDarkMode ? "#334155" : "#ffffff", // خلفية التولتيب
        titleColor: isDarkMode ? "#f8fafc" : "#0f172a", // عنوان التولتيب
        bodyColor: isDarkMode ? "#cbd5e1" : "#334155", // محتوى التولتيب
        borderColor: isDarkMode ? "#475569" : "#e2e8f0",
        borderWidth: 1,
      },
    },
  };

  return <Doughnut className="p-4" data={data} options={options} />;
}
