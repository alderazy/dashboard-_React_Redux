import { useSelector } from "react-redux";
import Header from "../feature/ui/heeader";
import Main from "../feature/ui/main";
import Sidebar from "../feature/ui/sidebar";

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
          className={`bg-[var(--card)] h-[100vh] fixed md:sticky z-25 overflow-hidden md:w-full start-0 top-0  transition-all duration-150
          ${!toggelsidebar ? "w-0" : "w-[250px]"}`}
        >
          <Sidebar></Sidebar>
        </div>
        <div className=" min-w-0  h-[300vh]">
          <div className=" ">
            <div className={`sticky top-0 bg-[var(--card)]`}>
              <Header></Header>
            </div>

            <div className="px-3">
              <Main></Main>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
