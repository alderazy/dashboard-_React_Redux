import { useSelector } from "react-redux";
import Header from "../feature/ui/heeader";
import Main from "../feature/ui/main";
import Sidebar from "../feature/ui/sidebar";
import Footer from "../feature/ui/footer";

export default function layout() {
  const toggelsidebar = useSelector((state) => state.Sidebar.sidebar);
  return (
    <>
      <div
        className={`grid   transition-all duration-300 bg-[var(--bg)] ${
          toggelsidebar
            ? "md:grid-cols-[250px_minmax(0,1fr)]"
            : "md:grid-cols-[80px_minmax(0,1fr)]"
        }`}
      >
        <div
          className={`bg-[var(--card)] h-[100vh] fixed  shadow md:sticky z-25 overflow-hidden md:w-full start-0 top-0  transition-all duration-150
          ${!toggelsidebar ? "w-0" : "w-[250px]"}`}
        >
          <Sidebar></Sidebar>
        </div>
        <div className=" min-w-0   min-h-[100vh]">
          <div className={`sticky top-0 bg-[var(--card)]`}>
            <Header></Header>
          </div>

          <div className="px-3 min-h-[86.6vh]">
            <Main></Main>
          </div>
          <footer className={`bg-[var(--card)]`}>
            <Footer />
          </footer>
        </div>
      </div>
    </>
  );
}
