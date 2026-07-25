// استدعاء مكون الحاوية العريضة (Card Container Wrapper)
import Card from "../components/card";

// استدعاء هوك الترجمة للتعامل مع النصوص متعددة اللغات
import { useTranslation } from "react-i18next";

// استدعاء المكونات الفرعية الخاصة بالصفحة الرئيسية (Home Components)
import Top from "../components/home/topCRD"; // الكروت الإحصائية العلوية
import Charbg from "../components/home/charbg"; // الرسم البياني الرئيسي (الكبير)
import CharSm from "../components/home/charSm"; // الرسم البياني الفرعي (الصغير)
import ProjectSummary from "../components/home/projectSummary"; // ملخص المشاريع
import OnTime from "../components/home/OnTime"; // مؤشر تسليم المهام في الموعد
import KpiCards from "../components/home/kpiCards"; // كروت مؤشرات الأداء الرئيسية (KPIs)
import ProjectOverview from "../components/home/projectOverview"; // نظرة عامة على المشاريع
import CharXm from "../components/home/charXm"; // الرسم البياني المصغر (Doughnut/Pie Chart)
import Team from "../components/home/Team"; // مكون عرض أعضاء الفريق
import Daily from "../components/home/daily"; // مكون عرض المهام اليومية (Daily Tasks)

export default function Home() {
  // استخراج دالة الترجمة t وجهاز التحكم في اللغة i18n
  const { t } = useTranslation();

  // معرفة اللغة الحالية المطبقة في الواجهة (ar أو en)

  // أوبجكت مرجعي لترجمة اسم الصفحة

  // ثوابت لتسهيل إعادة استخدام Tailwind Classes المتكررة
  const p = "text-[var(--text)]"; // تنسيق النصوص العادية

  return (
    <div className="py-4  ">
      {/* عنوان الصفحة المترجم اعتمداً على مكتبة i18next */}
      <p className={`${p}`}>{t("dashboard")}</p>

      {/* الحاوية الرئيسية لنظام الشبكة (Grid System Component - 12 Columns) */}
      <div className="grid grid-cols-12 gap-4 w-full">
        {/* ==================== الجزء الأول: العمود الأيسر/الرئيسي (9 أعمدة في الشاشات الكبيرة) ==================== */}
        <div className="col-span-12  xl:col-span-9  flex flex-col">
          {/* الابن الأول: الكروت العلوية المختصرة */}
          <div className="shrink-0">
            <Top></Top>
            {/* القائمة الملغاة كانت تستعرض كروت تجريبية (Card 1, 2, 3, 4) */}
          </div>

          {/* الابن الثاني: قسم الرسوم البيانية الوسطى */}
          <div className="grow flex">
            <div className="grid gap-5 mt-4 min-w-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {/* الرسم البياني الصغير يأخذ عمود واحد */}
              <div className="col-span-1">
                <Card>
                  <CharSm></CharSm>
                </Card>
              </div>

              {/* الرسم البياني الكبير يأخذ عمودين في الشاشات الكبيرة */}
              <div className="col-span-1 lg:col-span-2 ">
                <Card>
                  <Charbg />
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* ==================== الجزء الثاني: العمود الأيمن/الجانبي (3 أعمدة في الشاشات الكبيرة) ==================== */}
        <div className="col-span-12 xl:col-span-3 ">
          {/* كارت ملخص المشروع */}
          <div>
            <Card>
              <ProjectSummary />
            </Card>
          </div>

          {/* كارت مؤشر الالتزام بجدول المواعيد */}
          <div className="mt-4">
            <Card>
              <ul>
                <OnTime></OnTime>
              </ul>
            </Card>
          </div>
        </div>

        {/* ==================== الجزء الثالث: شريط كروت مؤشرات الأداء (بعرض 12 عمود كامل) ==================== */}
        <div className="col-span-12 ">
          <KpiCards />
        </div>

        {/* ==================== الجزء الرابع: القسم السفلي للوحة التحكم (4 أعمدة فرعية) ==================== */}
        <div className="col-span-12 min-w-[200px]">
          <div className="grid grid-cols-4 min-w-[200px] min-h-[400px]  gap-4">
            {/* الجزء الأيسر السفلي: النظرة العامة والرسم البياني المصغر */}
            <div className="col-span-4 xl:col-span-2 flex flex-wrap gap-4 rounded-lg p-3 w-full h-full shadow bg-[var(--card)]">
              {/* قسم النظرة العامة على المشروع */}
              <div className="w-full md:w-0 md:flex-1">
                <ProjectOverview />
              </div>
              {/* قسم الرسم البياني المصغر */}
              <div className="w-full md:w-0 min-h-[400px] md:flex-1 text-center">
                <CharXm />
              </div>
            </div>

            {/* الجزء الأيمن السفلي: أعضاء الفريق والمهام اليومية */}
            <div className="col-span-4 xl:col-span-2   flex justify-around flex-wrap gap-4">
              {/* كارت أعضاء الفريق */}
              <div className="w-full md:w-0 md:flex-1 rounded-lg  shadow bg-[var(--card)] ">
                <Team />
              </div>
              {/* كارت المهام اليومية */}
              <div className="w-full md:w-0 md:flex-1 rounded-lg  shadow bg-[var(--card)] ">
                <Daily />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
