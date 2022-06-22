import {
  ExitToAppOutlined,
  Language,
  NotificationsNone,
  Settings,
} from "@material-ui/icons";
import { useRef, useState } from "react";
import "./topbar.scss";
import { Link } from "react-router-dom";
import { LoginService } from "pages/Login/login.service";
import { useDispatch } from "react-redux";
export default function Topbar() {
  const [isTriggered, setIsTriggered] = useState(false);
  const nav = useRef(null);
  const loginService = useRef(new LoginService());
  const dispatch = useDispatch();

  window.addEventListener("scroll", (e) => {
    if (window.scrollY > 50) {
      setIsTriggered(true);
    } else {
      setIsTriggered(false);
    }
  });

  const logout = async () => {
    try {
      await loginService.current.signOut(dispatch);
    } catch (error) {
      throw error;
    }
  };

  return (
    <div
      className="topbar"
      ref={nav}
      style={{ background: isTriggered ? "#e5e5e5" : "" }}
    >
      <Link to="/">
        <span className="title">Flixadmin</span>
      </Link>
      <div className="links">
        <div className="notif">
          <button className="btn">
            <NotificationsNone className="icon " />
            <span>2</span>
          </button>
        </div>
        <button className="btn">
          <Language className="icon" />
        </button>
        <button className="btn">
          <Settings className="icon" />
        </button>
        <button className="btn" onClick={() => logout()}>
          <ExitToAppOutlined className="icon" />
        </button>
        <img
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          alt="profile"
        />
      </div>
    </div>
  );
}
