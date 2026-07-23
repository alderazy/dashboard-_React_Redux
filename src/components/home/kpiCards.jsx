import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { getDataDashboard } from "../../feature/slice/dashboardSlice";
import { FileText, Users, Star, FolderPlus, MoreVertical } from "lucide-react";
import CardSm from "../cardSm";
export default function kpiCards() {
  const dispatch = useDispatch();
  const data2 = useSelector((state) => state.DashboardData?.dashboard);
  const { i18n } = useTranslation();
  const lang = i18n.language;
  useEffect(() => {
    dispatch(getDataDashboard());
  }, [dispatch]);
  const kpiCards = data2?.kpiCards;
  const iconMap = {
    "file-text": FileText,
    users: Users,
    star: Star,
    "folder-plus": FolderPlus,
  };

  return (
    <div className="flex gap-4 flex-wrap">
      {kpiCards?.map((e) => {
        const Icon = iconMap[e.icon];
        return (
          <div key={e?.id} className="flex-1 min-w-[200px] xl:w-[25% - 1rem]">
            <div className="flex-1 min-w-[200px] xl:w-[25% - 1rem]">
              <CardSm
                IconF={<Icon style={{ color: e.color }} />}
                IconT={<MoreVertical style={{ color: e?.color }} />}
                title={e?.title?.[lang]}
                p={e?.value}
                bg={{ backgroundColor: e.bg }}
              ></CardSm>
            </div>
          </div>
        );
      })}
    </div>
  );
}
