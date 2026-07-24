// استدعاء Hooks من Redux لإدارة وتلقي البيانات من الـ Store
import { useSelector, useDispatch } from "react-redux";

// استدعاء مكتبة i18next للتعامل مع اللغات المختلفة (ar/en)
import { useTranslation } from "react-i18next";

// استدعاء Effect لتشغيل طلب البيانات فور تحميل المكون
import { useEffect } from "react";

// استدعاء الأكشن الخاص بجلب بيانات لوحة التحكم من الـ Redux Slice
import { getDataDashboard } from "../../feature/slice/dashboardSlice";

export default function projectOverview() {
  const dispatch = useDispatch();

  // جلب كائن بيانات لوحة التحكم من الـ Redux Store
  const data2 = useSelector((state) => state.DashboardData?.dashboard);

  // استخراج أداة الترجمة ومعرفة اللغة المطبقة حالياً
  const { i18n } = useTranslation();
  const lang = i18n.language;

  // جلب البيانات المحدثة عند تحميل المكون لأول مرة
  useEffect(() => {
    dispatch(getDataDashboard());
  }, [dispatch]);

  // استخراج قسم النظرة العامة للمشاريع وتصنيفاتها من البيانات
  const projectOverview = data2?.projectOverview;
  const categories = projectOverview?.categories;

  return (
    <div>
      {/* عنوان القسم الرئيسي المترجم حسب اللغة الحالية */}
      <h2 className="text-[var(--text-heading)] mb-7 mt-3 font-bold">
        {lang === "ar" ? "نظرة عامة على المشروع" : "Project Overview"}
      </h2>

      {/* قائمة عرض تصنيفات المشاريع */}
      <ul>
        {categories?.map((e) => {
          return (
            <li key={e.projects} className="flex items-center mb-3">
              {/* أيقونة النقطة الملونة مع خلفية شفافة من نفس درجة اللون (Hex Alpha 50) */}
              <div
                className="h-10 w-10 rounded-full me-3  grid place-content-center text-[var(--text-muted)]"
                style={{ backgroundColor: `${e.color}50` }} // إعطاء درجة شفافية للخلفية الدائرية
              >
                {/* النقطة الملونة الداخلية */}
                <p
                  className="w-3 h-3 bg-gray-400 rounded-full"
                  style={{ backgroundColor: `${e.color}` }}
                ></p>
              </div>

              {/* تفاصيل التصنيف: الاسم المترجم، عدد المشاريع، وعدد الموظفين */}
              <div>
                {/* اسم الفئة/التصنيف حسب اللغة المحددة */}
                <h3 className="text-[var(--text-heading)] font-extrabold">
                  {e?.name[lang]}
                </h3>

                <div className="flex">
                  {/* إجمالي عدد المشاريع تحت هذا التصنيف */}
                  <p className="text-[var(--text)] text-sm me-2 font-semibold">
                    {lang === "en"
                      ? `${e.projects} Total Projects .`
                      : `${e.projects} إجمالي المشاريع .`}
                  </p>

                  {/* إجمالي عدد الموظفين المخصصين */}
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
