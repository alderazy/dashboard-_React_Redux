// استدعاء أدوات Redux لإدارة وتداول البيانات مع الـ Store
import { useSelector, useDispatch } from "react-redux";

// استدعاء مكتبة i18next للتعامل مع اللغات المختلفة (ar/en)
import { useTranslation } from "react-i18next";

// استدعاء Hook للآثار الجانبية لتشغيل دالة الجلب فور تحميل المكون
import { useEffect } from "react";

// استدعاء الأكشن الخاص بجلب بيانات لوحة التحكم من Redux Slice
import { getDataDashboard } from "../../feature/slice/dashboardSlice";

// استدعاء الأيقونات المطلوبة من مكتبة Lucide Icons
import { FileText, Users, Star, FolderPlus, MoreVertical } from "lucide-react";

// استدعاء مكون الكارت المصغر Reusable Component
import CardSm from "../cardSm";

export default function kpiCards() {
  const dispatch = useDispatch();

  // استخراج كائن بيانات الداشبورد من الـ Redux Store
  const data2 = useSelector((state) => state.DashboardData?.dashboard);

  // استخراج أداة اللغات وقراءة اللغة الحالية (ar / en)
  const { i18n } = useTranslation();
  const lang = i18n.language;

  // جلب البيانات فور التحميل المبدئي للمكون
  useEffect(() => {
    dispatch(getDataDashboard());
  }, [dispatch]);

  // استخراج مصفوفة كروت مؤشرات الأداء (KPI Cards) من البيانات المرجعة
  const kpiCards = data2?.kpiCards;

  // خريطة لربط أسماء الأيقونات المرجعة من الـ JSON بمكونات Lucide Icons الفعلية
  const iconMap = {
    "file-text": FileText,
    users: Users,
    star: Star,
    "folder-plus": FolderPlus,
  };

  return (
    // الحاوية الرئيسية للكروت باستخدام Flexbox مع خاصية Wrap للتجاوب
    <div className="flex gap-4 flex-wrap">
      {/* التكرار على مصفوفة كروت مؤشرات الأداء وتوليد العناصر */}
      {kpiCards?.map((e) => {
        // تحديد المكون المناسب للأيقونة بناءً على المفتاح المرجع من الـ API/JSON
        const Icon = iconMap[e.icon];

        return (
          // حاوية الكارت الفردية مع تحديد حد أدنى للعرض للتجاوب على الشاشات المختلفة
          <div key={e?.id} className="flex-1 min-w-[200px] xl:w-[25% - 1rem]">
            <div className="flex-1 min-w-[200px] xl:w-[25% - 1rem]">
              {/* استدعاء مكون CardSm وتمرير البيانات والأيقونات عبر الـ Props */}
              <CardSm
                IconF={<Icon style={{ color: e.color }} />} // الأيقونة الرئيسية الملونة
                IconT={<MoreVertical style={{ color: e?.color }} />} // أيقونة خيارات القائمة المنسدلة الجانبية
                title={e?.title?.[lang]} // العنوان المترجم بناءً على اللغة الحالية
                p={e?.value} // القيمة الرقمية للمؤشر
                bg={{ backgroundColor: e.bg }} // خلفية لون الكارت المخصصة من البيانات
              ></CardSm>
            </div>
          </div>
        );
      })}
    </div>
  );
}
