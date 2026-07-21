import { useDispatch, useSelector } from "react-redux";
import { toggelTheme, toggelLang } from "../slice/theme";
import { toggelSidebar, toggelOver } from "../slice/toggelSidebar";
import { FaAlignJustify } from "react-icons/fa6";
import { IoSunnySharp } from "react-icons/io5";
import { IoMoonSharp } from "react-icons/io5";

export default function header() {
  const dispatch = useDispatch();
  const lang = useSelector((state) => state.Settheme.lang);
  const theme = useSelector((state) => state.Settheme.theme);

  return (
    <div className=" h-[69px] border border-transparent border-b-[var(--card-border)]">
      <div className=" w-full h-full items-center px-4 flex justify-between">
        <div>
          <button
            onClick={() => {
              dispatch(toggelSidebar());
              dispatch(toggelOver());
            }}
            className="cursor-pointer"
          >
            <FaAlignJustify className="text-xl text-[var(--text)]" />
          </button>
        </div>

        <div className="flex">
          <button
            onClick={() => {
              dispatch(toggelTheme());
            }}
            className="cursor-pointer grid place-content-center mx-3 h-10 w-10 bg-[var(--hover-bg)] hover:bg-[var(--active-bg)] transition-colors duration-75 rounded-full "
          >
            {theme === "dark" && (
              <IoSunnySharp className="text-2xl text-[var(--text-heading)]" />
            )}
            {theme === "light" && (
              <IoMoonSharp className="text-2xl text-[var(--text-heading)]" />
            )}
          </button>
          <button
            onClick={() => {
              dispatch(toggelLang());
            }}
            className="cursor-pointer h-10 w-10 bg-[var(--hover-bg)] hover:bg-[var(--active-bg)] transition-colors duration-75 rounded-full "
          >
            {lang === "ar" && (
              <p className="text-[var(--text)] font-semibold">eng</p>
            )}
            {lang === "eng" && (
              <p className=" text-[var(--text)] font-semibold">ع</p>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
