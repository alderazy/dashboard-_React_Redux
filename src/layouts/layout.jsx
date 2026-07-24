// استدعاء أداة useSelector للوصول إلى حالة السايدبار من متجر Redux
import { useSelector } from "react-redux";

// استدعاء مكونات الواجهة الأساسية الهيكلية (Layout Components)
import Header from "../feature/ui/heeader";
import Main from "../feature/ui/main";
import Sidebar from "../feature/ui/sidebar";
import Footer from "../feature/ui/footer";

export default function layout() {
  // جلب قيمة حالة فتح/طي السايدبار من الـ Redux Store
  const toggelsidebar = useSelector((state) => state.Sidebar.sidebar);

  return (
    <>
      {/* 
        1️⃣ الحاوية الرئيسية بأسلوب CSS Grid
        تتغير أعمدة الشبكة بناءً على قيمة toggelsidebar:
        - عند التوسيع: 250px للسايدبار والمتبقي للمحتوى الرئيسي (250px_minmax(0,1fr))
        - عند الطي: 80px للسايدبار والمتبقي للمحتوى الرئيسي (80px_minmax(0,1fr))
      */}
      <div
        className={`grid transition-all duration-300 bg-[var(--bg)] ${
          toggelsidebar
            ? "md:grid-cols-[250px_minmax(0,1fr)]"
            : "md:grid-cols-[80px_minmax(0,1fr)]"
        }`}
      >
        {/* 
          2️⃣ غلاف السايدبار (Sidebar Wrapper)
          - يكون ثابتاً (fixed) في الشاشات الصغيرة وتثبيتاً ممتداً (sticky) على الشاشات المتوسطة والكبيرة.
          - يتغير العرض من w-0 إلى w-[250px] في الشاشات الصغيرة حسب حالة toggelsidebar.
        */}
        <div
          className={`bg-[var(--card)] h-[100vh] fixed shadow md:sticky z-25 overflow-hidden md:w-full start-0 top-0 transition-all duration-150
          ${!toggelsidebar ? "w-0" : "w-[250px]"}`}
        >
          <Sidebar></Sidebar>
        </div>

        {/* 3️⃣ منطقة المحتوى الرئيسي (Header + Main Content + Footer) */}
        <div className=" min-w-0 min-h-[100vh]">
          {/* الهيدر العلوي الملتصق بالأعلى (Sticky Header) */}
          <div className={`sticky top-0 bg-[var(--card)]`}>
            <Header></Header>
          </div>

          {/* محتوى الصفحة الرئيسي المحدد بالحد الأدنى للارتفاع */}
          <div className="px-3 min-h-[86.6vh]">
            <Main></Main>
          </div>

          {/* الفوتر السفلي */}
          <footer className={`bg-[var(--card)]`}>
            <Footer />
          </footer>
        </div>
      </div>
    </>
  );
}
