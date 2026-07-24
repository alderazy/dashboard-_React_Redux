// استدعاء React Hooks لإدارة الحالات المحلية
import { useState } from "react";

// استدعاء useSelector لجلب حالة فتح/إغلاق القائمة الجانبية من Redux
import { useSelector } from "react-redux";

// استدعاء createPortal لرسم الـ Tooltip خارج نطاق DOM الخاص بالمكون (في document.body مباشرة)
import { createPortal } from "react-dom";

// استدعاء NavLink للتعامل مع التوجيه وإضافة كلاس التنشيط (active) تلقائياً
import { NavLink } from "react-router-dom";

// استدعاء مكتبة الترجمة لدعم اللغات واتجاهات الصفحة (Arabic/English - RTL/LTR)
import { useTranslation } from "react-i18next";

// استدعاء صورة الشعار
import srcImg from "../../../public/img/logo.png";

// استدعاء الأيقونات المخصصة لعناصر القائمة الجانبية
import { LayoutDashboard, Info, FolderKanban } from "lucide-react";

// مصفوفة عناصر الملاحة الموحدة لتسهيل التكرار والصيانة
const NAV_ITEMS = [
  {
    to: "/",
    labelKey: "dashboard",
    icon: LayoutDashboard,
    end: true,
  },
  {
    to: "/about",
    labelKey: "about",
    icon: Info,
  },
  {
    to: "/content",
    labelKey: "contect",
    icon: FolderKanban,
  },
];

export default function sidebar() {
  // جلب حالة القائمة الجانبية (مفتوحة/مطوية) من Redux Store
  const toggelsidebar = useSelector((state) => state.Sidebar.sidebar);

  // State لتخزين موقع ومحتوى الـ Tooltip الذي يظهر عند تحريك الماوس فوق العناصر
  const [Rek, setRek] = useState("");

  // استخراج أداة الترجمة والتحقق مما إذا كانت اللغة الحالية هي العربية (RTL)
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";

  /**
   * دالة حساب موقع الـ Tooltip ديناميكياً عند مرور الماوس فوق عنصر الملاحة
   * تستخدم getBoundingClientRect لحساب الإحداثيات بالنسبة للشاشة
   */
  const mousHover = (e, labelKey) => {
    const rec = e.currentTarget.getBoundingClientRect();

    // حساب المركز العمودي للعنصر
    const top = rec.top + rec.height / 2;

    // تحديد الموضع الأفقي بناءً على اتجاه اللغة (RTL/LTR)
    const left = isRtl ? rec.left - 10 : rec.right + 10;

    setRek({
      top,
      left,
      label: t(labelKey),
    });
  };

  // تفريغ حالة الـ Tooltip لإخفائه عند مغادرة الماوس للعنصر
  const moveLeave = () => {
    setRek(null);
  };

  return (
    <div className=" w-full h-full ">
      <div className="">
        {/* 1️⃣ قسم الشعار (Logo Section) */}
        <div className="logo border  border-transparent border-e-[var(--card-border)] h-15">
          <div className="w-15 h-full ">
            <img className="w-full h-full" src={srcImg} alt="logo" />
          </div>
        </div>

        {/* 2️⃣ قسم روابط الملاحة الرئيسي (Navigation Links) */}
        <div className="flex flex-col pt-7 border border-transparent border-t-[var(--card-border)]  overflow-hidden">
          {/* عنوان القائمة المترجم */}
          <p className="text-[var(--text)] text-center pb-7">
            {!isRtl ? "menue" : "القائمة"}
          </p>

          {/* التكرار على مصفوفة عناصر الملاحة */}
          {NAV_ITEMS.map((e) => {
            const Myicon = e.icon;
            const label = e.labelKey;
            return (
              <div key={e.to} className="">
                <NavLink
                  to={e.to}
                  end={e.end}
                  // تفعيل أحداث الماوس لحساب إحداثيات الـ Tooltip
                  onMouseEnter={(ev) => {
                    mousHover(ev, label);
                  }}
                  onMouseLeave={(ev) => {
                    moveLeave(ev);
                  }}
                  className={({ isActive }) =>
                    `flex relative hover:bg-[var(--active-bg)]  items-center py-3 text-xl whitespace-nowrap ${isActive ? "bg-[var(--active-bg)] " : ""}`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {/* مؤشر جانبي نحيف يظهر فقط عند تنشيط الرابط (Active State Indicator) */}
                      <span
                        className={`absolute end-0 top-0 bg-[var(--text)] w-[3px] transition-all duration-300 ${
                          isActive ? "h-full" : "h-0"
                        }`}
                      ></span>

                      {/* الأيقونة والنص المترجم */}
                      <Myicon className="w-6 text-[var(--text)] h-6 mx-6 shrink-0" />
                      <span className="text-[var(--text)]">{t(label)}</span>
                    </>
                  )}
                </NavLink>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3️⃣ رسم الـ Tooltip باستخدام Portal عند طي السايدبار وحساب الإحداثيات */}
      {Rek &&
        !toggelsidebar &&
        createPortal(
          <div
            style={{
              top: `${Rek.top}px`,
              left: `${Rek.left}px`,
            }}
            className={`fixed -translate-y-1/2 z-50 px-3 font-semibold text-[var(--text)] py-1 bg-[var(--card)]  text-sm rounded shadow-lg pointer-events-none whitespace-nowrap ${
              isRtl ? "-translate-x-full -ms-2" : "ms-2"
            }`}
          >
            {Rek.label}
          </div>,
          document.body, // تعليق العنصر بداخل الـ body لمنع مشاكل الـ overflow/z-index
        )}
    </div>
  );
}
