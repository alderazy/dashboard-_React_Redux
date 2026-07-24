// استدعاء المكونات الأساسية للـ Redux (جلب الحالة وتمرير الأكشنز)
import { useSelector, useDispatch } from "react-redux";

// استدعاء مكتبة i18next لإدارة اللغات والترجمة (ar/en)
import { useTranslation } from "react-i18next";

// استدعاء React Hooks لإدارة دورة حياة المكون والحالات الداخلية (States)
import { useEffect, useState } from "react";

// استدعاء مكتبة Framer Motion لإضافة أنيميشن عند الفلترة والتنقل
import { motion, AnimatePresence } from "framer-motion";

// استدعاء دالة جلب بيانات لوحة التحكم من Redux Slice
import { getDataDashboard } from "../../feature/slice/dashboardSlice";

// استدعاء أيقونة المستخدمين من مكتبة Lucide Icons
import { Users } from "lucide-react";

export default function Team() {
  const dispatch = useDispatch();

  // جلب بيانات لوحة التحكم من الـ Redux Store
  const data2 = useSelector((state) => state.DashboardData?.dashboard);

  // استخراج أداة اللغات ومعرفة اللغة المفعّلة حالياً
  const { i18n } = useTranslation();
  const lang = i18n.language;

  // State للتحكم في فتح وإغلاق القائمة المنسدلة (Dropdown)
  const [open, setopen] = useState(false);

  // State لتخزين النص المترجم المعروض حالياً في زر الفلتر
  const [active, setactive] = useState(() =>
    lang === "en" ? "today" : "اليوم",
  );

  // State لتخزين قيمة الفلترة الأساسية (الإنجليزي الثابت: today / yesterday / tomorrow)
  const [filt, setfilt] = useState("today");

  // State تبادلية (Boolean Toggle) لإعادة تشغيل أنيميشن Framer Motion عند تغير الفلتر
  const [animate, setanimate] = useState(false);
  //   const [list, setlist] = useState(false);

  // طلب البيانات فور تحميل مكون الفريق/المهام
  useEffect(() => {
    dispatch(getDataDashboard());
  }, [dispatch]);

  // استخراج قسم المهام اليومية من كائن البيانات
  const dailyTasks = data2?.dailyTasks;
  const title = dailyTasks?.title;
  const filterLabel = dailyTasks?.filterLabel;

  // تصفية المصفوفة بناءً على القيمة الثابتة للمنطق (filt)
  const list = dailyTasks?.list?.filter((e) => e.category === filt);

  // البحث عن أوبجكت التسمية المترجم المطابق للفلتر الحالي
  const activeLabelObj = filterLabel?.find((item) => item.category === filt);

  return (
    <div className="">
      {/* الهيدر العلوي: يضم زر الـ Dropdown وعنوان القسم */}
      <div className="flex justify-between px-3 py-3  z-20 relative ">
        {/* حاوية القائمة المنسدلة */}
        <div className=" w-25 relative shrink-0 z-40">
          {/* الزر الرئيسي للمنسدلة - يعرض النص المترجم المحدد */}
          <p
            className="text-sm text-[var(--text)] border py-1  ps-2  text-start rounded-md cursor-pointer hover:bg-[var(--active-bg)] transition-all duration-75"
            onClick={() => {
              setopen(!open);
            }}
          >
            {active || activeLabelObj?.[lang] || filterLabel?.[0]?.[lang]}
          </p>

          {/* خيارات القائمة المنسدلة بترانزيشن سلس بارتفاع الشبكة (Grid Rows Animation) */}
          <div
            className={`grid absolute w-full top-7 z-[100] start-0 transition-all duration-300  rounded-md
            ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]  "}`}
          >
            <ul className="min-h-0 overflow-hidden  bg-[var(--card)] ">
              {/* التكرار على مصفوفة عناصر الفلتر المترجمة */}
              {filterLabel?.map((e, i) => {
                const text = e?.[lang];

                return (
                  <li
                    key={i}
                    className={`border px-2 py-1 text-[var(--text)] cursor-pointer hover:bg-[var(--active-bg)] border-[var(--text)] ${!open ? "bg-[var(--active-bg)]" : ""}`}
                    onClick={(el) => {
                      el.preventDefault();
                      setopen(!open); // إغلاق القائمة
                      setactive(text); // تحديث النص الظاهر بـ اللغة الحالية
                      setanimate(!animate); // تحفيز تغيير الـ Key لتشغيل أنيميشن التلاشي
                      setfilt(e?.["en"]); // تحديد قيمة الفلتر البرمجية الثابتة (today / yesterday...)
                      console.log(e["en"]);
                    }}
                  >
                    {e?.[lang]}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* عنوان القائمة المترجم */}
        <h2 className="text-[var(--text-heading)] font-bold">
          {title?.[lang]}
        </h2>
      </div>

      <hr className="border border-transparent  border-t-[var(--card-border)]" />

      {/* قائمة عناصر المهام مع التمرير والأنيميشن */}
      <div className="px-3 py-4 z-[-1] block h-[350px] overflow-y-auto scrollbar-thin">
        {/* حاوية Framer Motion للتحكم بالأنيميشن أثناء الإضافة أو التغيير */}
        <AnimatePresence mode="wait">
          <motion.div
            key={animate ? "active" : "inactive"} // تغير الـ key يجبر Framer Motion على إعادة تشغيل الأنيميشن عند الفلترة
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {/* التكرار على القائمة المفلترة وتوليد الكروت */}
            {list?.map((e) => {
              return (
                <div
                  key={e.id + 1}
                  className="flex items-center my-3 border px-2 py-2 rounded-md border-[var(--text)]"
                >
                  <div className="text-sm">
                    {/* عنوان المهمة والوقت المنقضي */}
                    <h3 className="text-[var(--text-heading)] font-semibold text-sm flex">
                      {e?.title?.[lang]}
                      <p className="ms-3">{e?.timeAgo?.[lang]}</p>
                    </h3>

                    {/* تفاصيل ووصف المهمة وعدد الأشخاص */}
                    <div className="">
                      <p className="text-[var(--text)] me-1 ">
                        {e?.description?.[lang]}
                      </p>

                      {/* عرض أيقونة وعدد الأشخاص مع التصنيف */}
                      <p className="text-[var(--text)] text-nowrap flex items-center">
                        <Users className="me-1" />
                        {`${e?.peopleCount?.[lang]} ${e?.category}`}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
