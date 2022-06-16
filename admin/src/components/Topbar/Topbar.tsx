import { Language, NotificationsNone, Settings } from "@material-ui/icons";
import { useRef, useState } from "react";
import "./topbar.scss";
import { Link } from "react-router-dom";
export default function Topbar() {
  const [isTriggered, setIstriggered] = useState(false);
  const nav = useRef(null);
  window.addEventListener("scroll", (e) => {
    if (window.scrollY > 50) {
      setIstriggered(true);
    } else {
      setIstriggered(false);
    }
  });

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
          <NotificationsNone className="icon " />
          <span>2</span>
        </div>
        <Language className="icon" />
        <Settings className="icon" />
        <img
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          alt="profile"
        />
      </div>
    </div>
  );
}
