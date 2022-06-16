import "./card.scss";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";

type CardInterface = {
  price: number;
};
export default function Card({ price }: CardInterface) {
  return (
    <div className="card">
      <span className="title">Revenue</span>
      <div className="money">
        <span className="dollar">$2,529</span>
        <span className="evo">
          {price}{" "}
          {price > 0 ? (
            <ArrowUpward style={{ color: "lightgreen" }} />
          ) : (
            <ArrowDownward style={{ color: "rgb(255, 107, 107)" }} />
          )}
        </span>
      </div>
      <span className="compared">Compared to last month</span>
    </div>
  );
}
