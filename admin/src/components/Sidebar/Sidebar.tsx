import {
  AttachMoneyOutlined,
  HomeOutlined,
  ListOutlined,
  MailOutlined,
  MessageOutlined,
  MovieOutlined,
  PersonOutlined,
  ShowChart,
  Timeline,
} from "@material-ui/icons";
import "./sidebar.scss";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="dashboard">
        <p>Dashboard</p>
        <Link to="/">
          <span>
            <HomeOutlined className="icon" /> Home
          </span>
        </Link>
        <span>
          <Timeline className="icon" /> Analyses
        </span>
        <span>
          <ShowChart className="icon" /> Ventes
        </span>
      </div>
      <div className="menu">
        <p>Menu</p>
        <Link to="/users">
          <span>
            <PersonOutlined className="icon" /> Utilisateurs
          </span>
        </Link>
        <Link to="films">
          <span>
            <MovieOutlined className="icon" /> Films
          </span>
        </Link>
        <Link to="list">
          <span>
            <ListOutlined className="icon" /> List
          </span>
        </Link>
        <span>
          <AttachMoneyOutlined className="icon" /> Transactions
        </span>
      </div>
      <div className="notif">
        <p>Notifications</p>
        <span>
          <MailOutlined className="icon" /> Mail
        </span>
        <span>
          <MessageOutlined className="icon" /> Messages
        </span>
      </div>
    </div>
  );
}
