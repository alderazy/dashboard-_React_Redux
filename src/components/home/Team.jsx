import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getDataDashboard } from "../../feature/slice/dashboardSlice";

export default function Team() {
  const dispatch = useDispatch();
  const data2 = useSelector((state) => state.DashboardData?.dashboard);
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const [open, setopen] = useState(false);
  const [active, setactive] = useState(false);
  //   const [list, setlist] = useState(false);

  useEffect(() => {
    dispatch(getDataDashboard());
  }, [dispatch]);
  const teamMembers = data2?.teamMembers;
  const title = teamMembers?.title;
  const filterLabel = teamMembers?.filterLabel;
  const list = teamMembers?.list?.filter((e) => e.active === active);
  console.log(teamMembers);

  return (
    <div className="">
      <div className="flex justify-between px-3 py-3  z-20 relative ">
        <div className=" w-25 relative shrink-0 z-40">
          <p
            className="text-sm text-[var(--text)] border py-1  ps-2  text-start rounded-md cursor-pointer hover:bg-[var(--active-bg)] transition-all duration-75"
            onClick={() => {
              setopen(!open);
            }}
          >
            {active ? filterLabel?.[0]?.[lang] : filterLabel?.[1]?.[lang]}
          </p>

          <div
            className={`grid absolute w-full top-7 z-[100] start-0 transition-all duration-300  rounded-md
            ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]  "}`}
          >
            <ul className="min-h-0 overflow-hidden  bg-[var(--card)] ">
              <li
                className={`border px-2 py-1 text-[var(--text)] cursor-pointer hover:bg-[var(--active-bg)] border-[var(--text)] ${!open ? "bg-[var(--active-bg)]" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  setopen(!open);
                  setactive(true);
                }}
              >
                {filterLabel?.[0][lang]}
              </li>
              <li
                className={`border px-2 py-1 text-[var(--text)] cursor-pointer hover:bg-[var(--active-bg)] border-[var(--text)] ${!open ? "bg-[var(--active-bg)]" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  setopen(!open);
                  setactive(false);
                }}
              >
                {filterLabel?.[1][lang]}
              </li>
              <li
                className={`border px-2 py-1 text-[var(--text)] cursor-pointer hover:bg-[var(--active-bg)] border-[var(--text)] ${!open ? "bg-[var(--active-bg)]" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  setopen(!open);
                  setactive(false);
                }}
              >
                {filterLabel?.[1][lang]}
              </li>
            </ul>
          </div>
        </div>
        <h2 className="text-[var(--text-heading)] font-bold">
          {title?.[lang]}
        </h2>
      </div>
      <hr className="border border-transparent  border-t-[var(--card-border)]" />
      <div className="px-3 py-4 z-[-1] block h-[350px] overflow-y-auto scrollbar-thin">
        <AnimatePresence mode="wait">
          <motion.div
            key={active ? "active" : "inactive"} // key بيتغير لما active تتغير للبدء في أنيميشن جديد
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {list?.map((e) => {
              return (
                <div key={e.id + 1} className="flex items-center my-5">
                  <div className="w-10 h-10 rounded-full overflow-hidden me-4">
                    <img
                      className="w-full h-full object-fill"
                      src={e?.avatar}
                      alt=""
                    />
                  </div>

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
