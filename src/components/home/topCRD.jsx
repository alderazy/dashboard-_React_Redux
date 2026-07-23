import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import Card from "../card";
import { useEffect } from "react";
import { getDataDashboard } from "../../feature/slice/dashboardSlice";
import { Clock2 } from "lucide-react";
export default function card() {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const dispatch = useDispatch();
  const data = useSelector((state) => state.DashboardData?.dashboard.topCards);

  const round = "w-full h-full rounded-full border-3 border-white object-cover";

  useEffect(() => {
    dispatch(getDataDashboard());
  }, [dispatch]);

  return (
    <ul className="flex flex-wrap gap-4">
      {data?.map((e, i) => {
        return (
          <li key={i} className="flex-1 min-w-[200px] ">
            <Card>
              <div>
                <div className="flex  justify-between items-start ">
                  <p className="text-[var(--text-heading)] my-3 font-bold font-bold">
                    {e.title[lang]}
                  </p>
                  <p
                    className={` text-[var(--text)] font-semibold leading-none cursor-pointer`}
                  >
                    ...
                  </p>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <p
                      className={`text-[var(--text)] my-1 font-semibold text-sm`}
                    >
                      {e.subtitle[lang]}
                    </p>
                    <p
                      className={`flex text-[var(--text)] font-semibold text-sm`}
                    >
                      <Clock2 className="me-1"></Clock2>
                      {e.timeAgo[lang]}
                    </p>
                  </div>

                  <div className="flex items-center">
                    {e.avatars.map((el, i) => {
                      return (
                        <div
                          key={i}
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
