import {
  AttachMoneyOutlined,
  HomeOutlined,
  MailOutlined,
  MessageOutlined,
  PersonOutlined,
  ShowChart,
  StorefrontOutlined,
  Timeline,
} from "@material-ui/icons";
import "./sidebar.scss";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="dashboard">
        <p>Dashboard</p>
        <span>
          <HomeOutlined className="icon" /> Home
        </span>
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
            <PersonOutlined className="icon" /> utilisateurs
          </span>
        </Link>
        <Link to="products">
          <span>
            <StorefrontOutlined className="icon" /> Produits
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
