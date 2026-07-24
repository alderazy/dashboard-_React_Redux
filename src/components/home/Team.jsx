// استدعاء أدوات Redux لإدارة البيانات من الـ Store
import { useSelector, useDispatch } from "react-redux";

// استدعاء مكتبة الترجمة وتغيير اللغات (ar/en)
import { useTranslation } from "react-i18next";

// استدعاء React Hooks المخصصة للحالات ودورة حياة المكون
import { useEffect, useState } from "react";

// استدعاء Framer Motion لإضافة تأثيرات الحركة عند تبديل الفلتر
import { motion, AnimatePresence } from "framer-motion";

// استدعاء الأكشن الخاص بجلب بيانات لوحة التحكم
import { getDataDashboard } from "../../feature/slice/dashboardSlice";

export default function Team() {
  const dispatch = useDispatch();

  // جلب كائن بيانات لوحة التحكم من الـ Redux Store
  const data2 = useSelector((state) => state.DashboardData?.dashboard);

  // استخراج أداة الترجمة واللغة الحالية للواجهة
  const { i18n } = useTranslation();
  const lang = i18n.language;

  // State للتحكم في فتح وإغلاق القائمة المنسدلة (Dropdown)
  const [open, setopen] = useState(false);

  // State المنطقية (Boolean) للفلترة بين الأعضاء النشطين (true) والغير نشطين (false)
  const [active, setactive] = useState(false);
  //   const [list, setlist] = useState(false);

  // جلب البيانات فور تحميل المكون لأول مرة
  useEffect(() => {
    dispatch(getDataDashboard());
  }, [dispatch]);

  // استخراج قسم أعضاء الفريق وعناوين الفلتر
  const teamMembers = data2?.teamMembers;
  const title = teamMembers?.title;
  const filterLabel = teamMembers?.filterLabel;

  // تصفية الأعضاء بناءً على حالة النشاط (active Boolean)
  const list = teamMembers?.list?.filter((e) => e.active === active);

  return (
    <div className="">
      {/* 1️⃣ الهيدر العلوي: يضم القائمة المنسدلة للفلترة وعنوان القسم */}
      <div className="flex justify-between px-3 py-3  z-20 relative ">
        {/* حاوية زر القائمة المنسدلة */}
        <div className=" w-25 relative shrink-0 z-40">
          {/* النص المعروض في الزر الرئيسي بناءً على حالة active واللغة الحالية */}
          <p
            className="text-sm text-[var(--text)] border py-1  ps-2  text-start rounded-md cursor-pointer hover:bg-[var(--active-bg)] transition-all duration-75"
            onClick={() => {
              setopen(!open);
            }}
          >
            {active ? filterLabel?.[0]?.[lang] : filterLabel?.[1]?.[lang]}
          </p>

          {/* خيارات القائمة المنسدلة مع أنيميشن ارتفاع الشبكة (Grid Transition) */}
          <div
            className={`grid absolute w-full top-7 z-[100] start-0 transition-all duration-300  rounded-md
            ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]  "}`}
          >
            <ul className="min-h-0 overflow-hidden  bg-[var(--card)] ">
              {/* الخيار الأول: تفعيل الأعضاء (active = true) */}
              <li
                className={`border px-2 py-1 text-[var(--text)] cursor-pointer hover:bg-[var(--active-bg)] border-[var(--text)] ${!open ? "bg-[var(--active-bg)]" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  setopen(!open);
                  setactive(true);
                }}
              >
                {filterLabel?.[0]?.[lang]}
              </li>

              {/* الخيار الثاني: إيقاف الأعضاء (active = false) */}
              <li
                className={`border px-2 py-1 text-[var(--text)] cursor-pointer hover:bg-[var(--active-bg)] border-[var(--text)] ${!open ? "bg-[var(--active-bg)]" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  setopen(!open);
                  setactive(false);
                }}
              >
                {filterLabel?.[1]?.[lang]}
              </li>
            </ul>
          </div>
        </div>

        {/* عنوان قسم أعضاء الفريق المترجم */}
        <h2 className="text-[var(--text-heading)] font-bold">
          {title?.[lang]}
        </h2>
      </div>

      <hr className="border border-transparent  border-t-[var(--card-border)]" />

      {/* 2️⃣ قائمة عرض أعضاء الفريق المفلترة مع الأنيميشن والتمرير */}
      <div className="px-3 py-4 z-[-1] block h-[350px] overflow-y-auto scrollbar-thin">
        {/* حاوية حركة التبديل من Framer Motion */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active ? "active" : "inactive"} // key يتغير مع تغير active للبدء في أنيميشن دخول وخروج جديد
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {/* التكرار على مصفوفة أعضاء الفريق المفلترة */}
            {list?.map((e) => {
              return (
                <div key={e.id + 1} className="flex items-center my-5">
                  {/* الصورة الشخصية للعضو (Avatar) */}
                  <div className="w-10 h-10 rounded-full overflow-hidden me-4">
                    <img
                      className="w-full h-full object-fill"
                      src={e?.avatar}
                      alt=""
                    />
                  </div>

                  {/* معلومات العضو: الاسم، الخبرة، والمسمى الوظيفي */}
                  <div className="text-sm">
                    <h3 className="text-[var(--text-heading)] font-semibold text-sm">
                      {e?.name}
                    </h3>
                    <div className="flex">
                      <p className="text-[var(--text)] me-1 ">
                        {e?.experience?.[lang]}
                      </p>
                      <p className="text-[var(--text)] text-nowrap">
                        {e?.role?.[lang]}
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
