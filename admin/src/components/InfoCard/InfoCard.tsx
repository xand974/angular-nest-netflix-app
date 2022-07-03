import {
  CalendarTodayOutlined,
  EmailOutlined,
  PermIdentityOutlined,
  PresentToAll,
} from "@material-ui/icons";
import "./info-card.scss";
import { UserModel, MovieModel } from "netflix-malet-types";

export type InfoCardType = {
  data: UserModel | (MovieModel & UserModel & MovieModel);
};
export default function InfoCard({ data }: InfoCardType) {
  return (
    <div className="profile">
      <div className="picture">
        <img src={data.photoURL} alt="" />
        <div className="infos">
          <span>{data.username}</span>
          <span>{data.email}</span>
        </div>
      </div>
      <div className="account">
        <p>Account Details</p>

        <span>
          <PermIdentityOutlined className="icon" /> {data.username}
        </span>
        <span>
          <CalendarTodayOutlined className="icon" /> 10.06.98
        </span>
      </div>
      <div className="account">
        <p>Contact Details</p>
        <span>
          <EmailOutlined className="icon" /> {data.email}
        </span>
        <span>
          <PresentToAll className="icon" /> Profiles Count : {data.profileCount}
        </span>
      </div>
    </div>
  );
}
