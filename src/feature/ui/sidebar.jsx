import { useState } from "react";
import { useSelector } from "react-redux";
import { createPortal } from "react-dom";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import srcImg from "../../../public/img/logo.png";
import { LayoutDashboard, Info, FolderKanban } from "lucide-react";

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
  const toggelsidebar = useSelector((state) => state.Sidebar.sidebar);
  const [Rek, setRek] = useState("");
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";
  const mousHover = (e, labelKey) => {
    const rec = e.currentTarget.getBoundingClientRect();

    const top = rec.top + rec.height / 2;
    const left = isRtl ? rec.left - 10 : rec.right + 10;

    setRek({
      top,
      left,
      label: t(labelKey),
    });
  };

  const moveLeave = () => {
    setRek(null);
  };

  return (
    <div className=" w-full h-full ">
      <div className="">
        <div className="logo border  border-transparent border-e-[var(--card-border)] h-15">
          <div className="w-15 h-full ">
            <img className="w-full h-full" src={srcImg} alt="logo" />
          </div>
        </div>
        <div className="flex flex-col pt-7 border border-transparent border-t-[var(--card-border)]  overflow-hidden">
          <p className="text-[var(--text)] text-center pb-7">
            {!isRtl ? "menue" : "القائمة"}
          </p>
          {NAV_ITEMS.map((e) => {
            const Myicon = e.icon;
            const label = e.labelKey;
            return (
              <div key={e.to} className="">
                <NavLink
                  to={e.to}
                  end={e.end}
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
                      <span
                        className={`absolute end-0 top-0 bg-[var(--text)] w-[3px] transition-all duration-300 ${
                          isActive ? "h-full" : "h-0"
                        }`}
                      ></span>

                      {/* الأيقونة والنص */}
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
          document.body,
        )}
    </div>
  );
}
