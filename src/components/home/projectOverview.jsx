import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { getDataDashboard } from "../../feature/slice/dashboardSlice";

export default function projectOverview() {
  const dispatch = useDispatch();
  const data2 = useSelector((state) => state.DashboardData?.dashboard);
  const { i18n } = useTranslation();
  const lang = i18n.language;

  useEffect(() => {
    dispatch(getDataDashboard());
  }, [dispatch]);
  const projectOverview = data2?.projectOverview;
  const categories = projectOverview?.categories;

  return (
    <div>
      <h2 className="text-[var(--text-heading)] mb-7 mt-3 font-bold">
        {lang === "ar" ? "نظرة عامة على المشروع" : "Project Overview"}
      </h2>
      <ul>
        {categories?.map((e) => {
          return (
            <li key={e.projects} className="flex items-center mb-3">
              <div
                className="h-10 w-10 rounded-full me-3  grid place-content-center text-[var(--text-muted)]"
                style={{ backgroundColor: `${e.color}50` }}
              >
                <p
                  className="w-3 h-3 bg-gray-400 rounded-full"
                  style={{ backgroundColor: `${e.color}` }}
                ></p>
              </div>

              <div>
                <h3 className="text-[var(--text-heading)] font-extrabold">
                  {e?.name[lang]}
                </h3>
                <div className="flex">
                  <p className="text-[var(--text)] text-sm me-2 font-semibold">
                    {lang === "en"
                      ? `${e.projects} Total Projects .`
                      : `${e.projects} إجمالي المشاريع .`}
                  </p>
                  <p className="text-[var(--text)] font-semibold text-sm">
                    {lang === "en"
                      ? `${e.employees}  Employees`
                      : `${e.employees} موظفين`}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
