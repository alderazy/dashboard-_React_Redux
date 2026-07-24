// استدعاء أدوات Redux لإدارة وتلقي البيانات من الـ Store
import { useSelector, useDispatch } from "react-redux";

// استدعاء مكتبة i18next للتحكم في الترجمة وتغيير اللغات (ar/en)
import { useTranslation } from "react-i18next";

// استدعاء React Hooks لإدارة دورة الحياة والحالات الداخلية (States)
import { useEffect, useState } from "react";

// استدعاء الأكشن الخاص بجلب بيانات لوحة التحكم من الـ Redux Slice
import { getDataDashboard } from "../../feature/slice/dashboardSlice";

// استدعاء مكونات الحركة والأنيميشن للقوائم المنبثقة من Framer Motion
import { motion, AnimatePresence } from "motion/react";

// استدعاء مجموعة الأيقونات المطلوبة من مكتبة Lucide Icons
import {
  Ellipsis,
  FilePenLine,
  CirclePlus,
  Trash2,
  FileMinus,
  Users,
  CheckCircle2,
  Send,
  Compass,
  Info,
} from "lucide-react";

// استدعاء المكونات الفرعية المخصصة للكروت (Card Components)
import Card from "../card";
import CardSm from "../cardSm";

export default function ProjectSummary() {
  const dispatch = useDispatch();

  // جلب كائن بيانات لوحة التحكم من الـ Redux Store
  const data2 = useSelector((state) => state.DashboardData?.dashboard);

  // استخراج أداة الترجمة واللغة الحالية للواجهة
  const { i18n } = useTranslation();
  const lang = i18n.language;

  // State للتحكم في إظهار وإخفاء قائمة الخيارات المنبثقة (Dropdown Card)
  const [toggelCard, settoggelCard] = useState(false);

  // خريطة لربط أسماء الأيقونات القادمة من الـ JSON بمكونات Lucide Icons الفعلية
  const iconMap = {
    users: Users,
    compass: Compass,
    "check-circle": CheckCircle2, // الربط مع الاسم المطابق لمكتبة Lucide
    send: Send,
  };

  // طلب البيانات فور تحميل المكون لأول مرة
  useEffect(() => {
    dispatch(getDataDashboard());
  }, [dispatch]);

  // دالة تبديل حالة فتح/إغلاق القائمة المنبثقة
  const toggel = () => {
    settoggelCard(!toggelCard);
  };

  // دالة لإغلاق القائمة المنبثقة
  const toggel2 = () => {
    settoggelCard(false);
  };

  // استخراج بيانات ملخص المشروعات من الكائن المرجع
  const projectSummary = data2?.projectSummary;
  const title = projectSummary?.title?.[lang]; // عنوان القائمة المترجم
  const totalProjectsText = projectSummary?.totalProjectsText?.[lang]; // نص إجمالي المشاريع المترجم
  const stats = projectSummary?.stats; // مصفوفة الإحصائيات الفرعية

  return (
    <div>
      {/* 1️⃣ الهيدر العلوي: العنوان وزر القائمة المنسدلة */}
      <div>
        <div className="flex justify-between items-center">
          {/* عنوان ملخص المشروع المترجم */}
          <h2 className="text-[var(--text-heading)] my-3 font-bold font-bold">
            {title}
          </h2>

          {/* زر الخيارات ثلاثي النقاط والقائمة المنبثقة */}
          <div className="relative">
            <motion.button
              className="text-[var(--text-heading)] cursor-pointer my-3 font-bold font-bold"
              onClick={() => {
                toggel();
              }}
            >
              <Ellipsis />
            </motion.button>

            {/* أنيميشن القائمة المنبثقة عند الفتح والإغلاق باستخدام Framer Motion */}
            <AnimatePresence initial={false}>
              {toggelCard ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }} // الحالة المبدئية عند الظهور
                  animate={{ opacity: 1, scale: 1 }} // الحالة أثناء العرض
                  exit={{ opacity: 0, scale: 0 }} // الحالة عند الاختفاء
                  key="box"
                  className={`absolute shadow-2xl overflow-hidden end-7 top-6 `}
                >
                  <Card>
                    {/* خيار الإضافة */}
                    <div className="flex px-3  cursor-pointer rounded-md py-2 text-[var(--text)] hover:bg-[var(--hover-bg)] ">
                      <p className="pe-2">{lang === "ar" ? "اضافه" : "add"}</p>
                      <CirclePlus></CirclePlus>
                    </div>

                    {/* خيار التعديل */}
                    <div className="flex px-3 cursor-pointer rounded-md py-2 text-[var(--text)] hover:bg-[var(--hover-bg)] ">
                      <p className="pe-2">{lang === "ar" ? "اضافه" : "add"}</p>
                      <FilePenLine></FilePenLine>
                    </div>

                    {/* خيار الحذف */}
                    <div className="flex px-3 cursor-pointer rounded-md py-2 text-[var(--text)] hover:bg-[var(--hover-bg)] ">
                      <p className="pe-2">{lang === "ar" ? "اضافه" : "add"}</p>
                      <Trash2></Trash2>
                    </div>
                  </Card>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* 2️⃣ شريط التنبيه/المعلومات الخاص بإجمالي المشاريع */}
      <div className="bg-yellow-200 text-yellow-700 flex justify-between items-center p-2">
        <p>{totalProjectsText}</p>
        <FileMinus />
      </div>

      {/* 3️⃣ التكرار على مصفوفة الإحصائيات وعرض كروت CardSm الديناميكية */}
      {stats?.map((el) => {
        // تحديد الأيقونة المناسبة من الخريطة بناءً على الاسم المرجع في البيانات
        const Ico = iconMap[el?.icon];

        return (
          <CardSm
            key={el?.id}
            IconF={<Ico style={{ color: el.color }} />} // الأيقونة الرئيسية الملونة
            title={el?.title?.[lang]} // العنوان حسب اللغة
            p={`${el?.value} ${el?.unit?.[lang]}`} // القيمة مع وحدة القياس المترجمة
            bg={{ backgroundColor: el.bgColor }} // لون خلفية الكارت المخصص
            IconT={<Info style={{ color: el.color }} />} // أيقونة التفاصيل الجانبية
          />
        );
      })}
    </div>
  );
}
