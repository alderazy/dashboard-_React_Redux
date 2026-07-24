// استدعاء دالة التأثيرات الجانبية (Side Effects) من React
import { useEffect } from "react";

// استدعاء موفر المسارات (Router Provider) للتحكم في التنقل بين الصفحات
import { RouterProvider } from "react-router-dom";

// استدعاء شجرة المسارات (Routes Configuration) المعرفة في ملف router
import { router } from "./router";

// استدعاء ملف التنسيقات الخاص بالمكون الرئيسي
import "./App.css";

// استدعاء مكون الطبقة المظلمة / الشفافة (Overlay Container)
import Over from "./feature/over";

// استدعاء Hook للوصول لبيانات الـ Redux Store
import { useSelector } from "react-redux";

// استدعاء إعدادات مكتبة الترجمة وتغيير اللغات
import i18n from "./i18n";

function App() {
  // جلب الحالة الحالية للمظهر (dark أو light) من الـ Redux Store
  const theme = useSelector((state) => state.Settheme.theme);

  // جلب اللغة المحددة حالياً (ar أو en) من الـ Redux Store
  const lang = useSelector((state) => state.Settheme.lang);

  // تأثير جانبي يتم تشغيله فور تحميل الصفحة أو عند تغير الـ theme أو الـ lang
  useEffect(() => {
    // 1. تطبيق نظام المظهر (Theme Handler):
    // إضافة أو إزالة Class "dark" من العنصر الرئيسي <html> لتفعيل تنسيقات الوضع الداكن عبر Tailwind/CSS
    theme === "dark"
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");

    // 2. ضبط اتجاه الصفحة (RTL / LTR Handler):
    // تغيير الخاصية dir في عنصر <html> لتناسب اللغة (من اليمين لليوم للعربي، ومن اليسار لليمين للإنجليزي)
    lang === "en"
      ? document.documentElement.setAttribute("dir", "ltr")
      : document.documentElement.setAttribute("dir", "rtl");

    // 3. مزامنة لغة واجهة الترجمة:
    // تحديث اللغة الحالية المطبقة في مكتبة i18next
    i18n.changeLanguage(lang);
  }, [theme, lang]); // مصفوفة الاعتمادات: إعادة تنفيذ الكود عند تغير قيم القالب أو اللغة

  return (
    <>
      <div>
        {/* عرض المكون الفرعي الخاص بالـ Overlay (مثل القوائم المنسدلة أو الـ Modals) */}
        <Over />

        {/* تفعيل موجه المسارات لتمرير الصفحات المحددة في ملف router */}
        <RouterProvider router={router} />
      </div>
    </>
  );
}

// تصدير المكون الرئيسي لاستخدامه في ملف الإقلاع main.jsx
export default App;
