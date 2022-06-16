import "./featuredInfos.scss";
import Card from "components/Card/Card";
export default function FeatureInfos() {
  return (
    <div className="featuredInfos">
      <Card price={20.84} />
      <Card price={-15.3} />
      <Card price={-3.35} />
    </div>
  );
}
