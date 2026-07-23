import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { getDataDashboard } from "../../feature/slice/dashboardSlice";
import { motion, AnimatePresence } from "motion/react";
import {
  Ellipsis,
  FilePenLine,
  CirclePlus,
  Trash2,
  FileMinus,
  Users,
  CheckCircle2,
  Send,
  Compass,
  Info,
} from "lucide-react";

import Card from "../card";
import CardSm from "../cardSm";

export default function ProjectSummary() {
  const dispatch = useDispatch();
  const data2 = useSelector((state) => state.DashboardData?.dashboard);
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const [toggelCard, settoggelCard] = useState(false);
  const iconMap = {
    users: Users,
    compass: Compass,
    "check-circle": CheckCircle2, // حتى لو الاسم في الـ JSON خفيف، هنا بتظبطه على اسم المكتبة الصح
    send: Send,
  };

  useEffect(() => {
    dispatch(getDataDashboard());
  }, [dispatch]);

  const toggel = () => {
    settoggelCard(!toggelCard);
  };
  const toggel2 = () => {
    settoggelCard(false);
  };

  const projectSummary = data2?.projectSummary;
  const title = projectSummary?.title?.[lang];
  const totalProjectsText = projectSummary?.totalProjectsText?.[lang];
  const stats = projectSummary?.stats;

  return (
    <div
      onClick={() => {
        toggel2();
      }}
    >
      <div>
        <div className="flex justify-between items-center">
          <h2 className="text-[var(--text-heading)] my-3 font-bold font-bold">
            {title}
          </h2>
          <div className="relative">
            <motion.button
              className="text-[var(--text-heading)] cursor-pointer my-3 font-bold font-bold"
              onClick={() => {
                toggel();
              }}
            >
              <Ellipsis />
            </motion.button>
            <AnimatePresence initial={false}>
              {toggelCard ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  key="box"
                  className={`absolute shadow-2xl overflow-hidden end-7 top-6 `}
                >
                  <Card>
                    <div className="flex px-3  cursor-pointer rounded-md py-2 text-[var(--text)] hover:bg-[var(--hover-bg)] ">
                      <p className="pe-2">{lang === "ar" ? "اضافه" : "add"}</p>
                      <CirclePlus></CirclePlus>
                    </div>
                    <div className="flex px-3 cursor-pointer rounded-md py-2 text-[var(--text)] hover:bg-[var(--hover-bg)] ">
                      <p className="pe-2">{lang === "ar" ? "اضافه" : "add"}</p>
                      <FilePenLine></FilePenLine>
                    </div>
                    <div className="flex px-3 cursor-pointer rounded-md py-2 text-[var(--text)] hover:bg-[var(--hover-bg)] ">
                      <p className="pe-2">{lang === "ar" ? "اضافه" : "add"}</p>
                      <Trash2></Trash2>
                    </div>
                  </Card>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <div className="bg-yellow-200 text-yellow-700 flex justify-between items-center p-2">
        <p>{totalProjectsText}</p>
        <FileMinus />
      </div>
      {stats?.map((el) => {
        const Ico = iconMap[el?.icon];

        return (
          <CardSm
            key={el?.id}
            IconF={<Ico style={{ color: el.color }} />}
            title={el?.title?.[lang]}
            p={`${el?.value} ${el?.unit?.[lang]}`}
            bg={{ backgroundColor: el.bgColor }}
            IconT={<Info style={{ color: el.color }} />}
          />
        );
      })}
    </div>
  );
}
