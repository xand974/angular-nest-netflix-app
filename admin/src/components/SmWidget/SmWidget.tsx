import { Visibility } from "@material-ui/icons";
import "./smWidget.scss";
import { useEffect, useState, useRef } from "react";
import { UserService } from "../../services/user.service";
import { UserModel } from "netflix-malet-types";
import { useHistory } from "react-router";

export default function SmWidget() {
  const [newUsers, setNewUsers] = useState<UserModel[]>([]);
  const history = useHistory();
  const userService = useRef(new UserService());

  useEffect(() => {
    const getUsers = async () => {
      const res = await userService.current.getNewUsers(10);
      setNewUsers([...res.data]);
    };
    getUsers();
  }, []);
  const goToProfile = (id: string | undefined) => {
    if (!id) return;
    history.push(`/user/${id}`);
  };
  return (
    <div className="smWidget">
      <h3 className="members__text">New Join Members</h3>
      <div className="wrapper">
        {newUsers.map((item, index) => (
          <div className="display__user" key={index}>
            <img src={item.photoURL} alt="" />
            <div className="infos">
              <span className="name">{item.email}</span>
              <span className="job">{item.username}</span>
            </div>
            <button onClick={() => goToProfile(item._id)}>
              <Visibility /> display
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
