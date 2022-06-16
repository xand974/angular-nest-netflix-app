import "./home.scss";
import FeaturedInfos from "components/FeaturedInfos/FeatureInfos";
import Chart from "components/Chart/Chart";
import SmWidget from "components/SmWidget/SmWidget";
import LgWidget from "components/LgWidget/LgWidget";

export default function Home() {
  return (
    <div className="home">
      <FeaturedInfos />
      <Chart />
      <div className="widgets">
        <SmWidget />
        <LgWidget />
      </div>
    </div>
  );
}
