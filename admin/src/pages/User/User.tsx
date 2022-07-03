import EditCard from "components/EditCard/EditCard";
import InfoCard from "components/InfoCard/InfoCard";
import { Link, useLocation } from "react-router-dom";
import "./user.scss";
import { useEffect, useRef, useState } from "react";
import { UserService } from "../../services/user.service";
import { UserModel } from "netflix-malet-types";

export default function User() {
  const location = useLocation();
  const ID = location.pathname.split("/")[2];
  const userService = useRef(new UserService());
  const [user, setUser] = useState({} as UserModel);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await userService.current.getUser(ID);
        setUser({ ...res.data });
      } catch (error) {
        throw error;
      }
    };
    getUser();
  }, [ID]);

  return (
    <div className="user">
      <div className="title">
        <h3>Edit User</h3>
        <Link to="/add">
          <span>Create</span>
        </Link>
      </div>
      <div className="wrapper">
        <InfoCard data={user} />
        <EditCard data={user} />
      </div>
    </div>
  );
}
