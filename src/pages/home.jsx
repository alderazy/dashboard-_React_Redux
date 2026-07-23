import Card from "../components/card";
import { useTranslation } from "react-i18next";
import Top from "../components/home/topCRD";
import Charbg from "../components/home/charbg";
import CharSm from "../components/home/charSm";
import ProjectSummary from "../components/home/projectSummary";
import OnTime from "../components/home/OnTime";
import KpiCards from "../components/home/kpiCards";
import ProjectOverview from "../components/home/projectOverview";
import CharXm from "../components/home/charXm";
import Team from "../components/home/Team";
import Daily from "../components/home/daily";

export default function Home() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const namePage = { ar: "لوحة التحكم", en: "dashboard" };
  const h = "text-[var(--text-heading)] font-bold";
  const p = "text-[var(--text)]";
  const round = "w-full h-full rounded-full";
  return (
    <div className="py-4  ">
      <p className={`${p}`}>{t("dashboard")}</p>

      <div className="grid grid-cols-12 gap-4 w-full">
        {/* {" one"} */}
        <div className="col-span-12  xl:col-span-9 border">
          {/* {"CHILD ONE"} */}

          <div>
            <Top></Top>
            {/* <ul className="flex flex-wrap gap-4">
              <li className="flex-1 min-w-[200px] ">
                <Card>1</Card>
              </li>
              <li className="flex-1 min-w-[200px] xl:min-w-[calc(25%-1rem)]">
                <Card>2</Card>
              </li>
              <li className="flex-1 min-w-[200px] xl:min-w-[calc(25%-1rem)]">
                <Card>3</Card>
              </li>
              <li className="flex-1 min-w-[200px] xl:min-w-[calc(25%-1rem)]">
                <Card>4</Card>
              </li>
            </ul> */}
          </div>
          {/* {"CHILD tow"} */}
          <div>
            <div className="grid gap-5 mt-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <div className="col-span-1">
                <Card>
                  <CharSm></CharSm>
                </Card>
              </div>
              <div className="col-span-1 lg:col-span-2 h-100">
                <Card>
                  <Charbg />
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* {"tow"} */}
        <div className="col-span-12 xl:col-span-3 border">
          {/* {"child one"} */}

          <div>
            <Card>
              <ProjectSummary />
            </Card>
          </div>

          {/* {"child tow"} */}
          <div className="mt-4">
            <Card>
              <ul>
                <OnTime></OnTime>
              </ul>
            </Card>
          </div>
        </div>

        {/* {"three"} */}
        <div className="col-span-12 border">
          <KpiCards />
        </div>

        {/* {"three"} */}

        {/* {"for"} */}
        <div className="col-span-12 border">
          <div className="grid grid-cols-4  gap-4">
            {/* {"one"} */}
            <div className="col-span-4 xl:col-span-2 flex flex-wrap gap-4 rounded-lg p-3 w-full h-full shadow bg-[var(--card)]">
              <div className="w-full md:w-0 md:flex-1">
                <ProjectOverview />
              </div>
              <div className="w-full md:w-0 md:flex-1 text-center">
                <CharXm />
              </div>
            </div>

            {/* {"tow"} */}
            <div className="col-span-4 xl:col-span-2   flex justify-around flex-wrap gap-4">
              <div className="w-full md:w-0 md:flex-1 rounded-lg  shadow bg-[var(--card)] ">
                <Team />
              </div>
              <div className="w-full md:w-0 md:flex-1 rounded-lg  shadow bg-[var(--card)] ">
                <Daily />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* {"for"} */}
    </div>
  );
}
