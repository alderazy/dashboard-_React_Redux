// استدعاء أدوات Redux لإدارة وتداول البيانات مع الـ Store
import { useSelector, useDispatch } from "react-redux";

// استدعاء مكتبة الترجمة وتغيير اللغات (ar/en)
import { useTranslation } from "react-i18next";

// استدعاء مكون الكارت الرئيسي المخصص
import Card from "../card";

// استدعاء Hook للآثار الجانبية لتشغيل طلب البيانات فور التحميل
import { useEffect } from "react";

// استدعاء دالة جلب بيانات لوحة التحكم من الـ Redux Slice
import { getDataDashboard } from "../../feature/slice/dashboardSlice";

// استدعاء أيقونة الساعة من مكتبة Lucide Icons
import { Clock2 } from "lucide-react";

export default function card() {
  // استخراج أداة الترجمة واللغة الحالية للواجهة
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const dispatch = useDispatch();

  // جلب مصفوفة الكروت العلوية (topCards) المرجعة من الـ Redux Store
  const data = useSelector((state) => state.DashboardData?.dashboard.topCards);

  // كلاس CSS جاهز لإعطاء صور الأفاتار شكلاً دائرياً مع إطار
  const round = "w-full h-full rounded-full border-3 border-white object-cover";

  // طلب جلب البيانات فور التحميل المبدئي للمكون
  useEffect(() => {
    dispatch(getDataDashboard());
  }, [dispatch]);

  return (
    // قائمة الكروت بأسلوب Flexbox مع خاصية Wrap وتحديد العرض التلقائي
    <ul className="flex flex-wrap gap-4">
      {/* التكرار على مصفوفة topCards لتوليد الكروت */}
      {data?.map((e, i) => {
        return (
          <li key={i} className="flex-1 min-w-[200px] ">
            <Card>
              <div>
                {/* 1️⃣ الجزء العلوي: العنوان الرئيسي وزر الخيارات الجانبية */}
                <div className="flex  justify-between items-start ">
                  {/* عنوان الكارت المترجم حسب اللغة الحالية */}
                  <p className="text-[var(--text-heading)] my-3 font-bold font-bold">
                    {e.title[lang]}
                  </p>

                  {/* زر النقاط الثلاث للخيارات الجانبية */}
                  <p
                    className={` text-[var(--text)] font-semibold leading-none cursor-pointer`}
                  >
                    ...
                  </p>
                </div>

                {/* 2️⃣ الجزء السفلي: العنوان الفرعي، الوقت، والأفاتار المترابط */}
                <div className="flex justify-between items-center">
                  {/* تفاصيل النص والوقت المنقضي */}
                  <div>
                    {/* العنوان الفرعي المترجم */}
                    <p
                      className={`text-[var(--text)] my-1 font-semibold text-sm`}
                    >
                      {e.subtitle[lang]}
                    </p>

                    {/* أيقونة الساعة والوقت المنقضي */}
                    <p
                      className={`flex text-[var(--text)] font-semibold text-sm`}
                    >
                      <Clock2 className="me-1"></Clock2>
                      {e.timeAgo[lang]}
                    </p>
                  </div>

                  {/* مجموعة صور الأفاتار المتداخلة (Avatar Stacking) */}
                  <div className="flex items-center">
                    {e.avatars.map((el, i) => {
                      return (
                        <div
                          key={i}
                          // استخدام -ms-3 لعمل تداخل سلس بين الصور المتتالية
                          className={`w-8 h-8 rounded-full border-2 border-white overflow-hidden ${i > 0 ? "-ms-3" : ""}`}
                        >
                          <img
                            className="w-full h-full object-cover"
                            src={el}
                            alt={`avatar-${i}`}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Card>
          </li>
        );
      })}
    </ul>
  );
}
