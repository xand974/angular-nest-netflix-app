import {
  CalendarTodayOutlined,
  CloudUploadOutlined,
  EmailOutlined,
  LocationCityOutlined,
  PermIdentityOutlined,
  PhoneOutlined,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import "./user.scss";

export default function User() {
  return (
    <div className="user">
      <div className="title">
        <h3>Edit User</h3>
        <Link to="/add">
          <span>Create</span>
        </Link>
      </div>
      <div className="wrapper">
        <div className="profile">
          <div className="picture">
            <img
              src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
              alt=""
            />
            <div className="infos">
              <span>Anna Becker</span>
              <span>Software Engineer</span>
            </div>
          </div>
          <div className="account">
            <p>Account Details</p>

            <span>
              <PermIdentityOutlined className="icon" /> annabeck99
            </span>
            <span>
              <CalendarTodayOutlined className="icon" /> 10.06.98
            </span>
          </div>
          <div className="account">
            <p>Contact Details</p>
            <span>
              {" "}
              <PhoneOutlined className="icon" /> 06 74 56 25 41{" "}
            </span>
            <span>
              <EmailOutlined className="icon" /> annabeck99@gmail.com
            </span>
            <span>
              <LocationCityOutlined className="icon" /> New York | USA
            </span>
          </div>
        </div>
        <div className="edit">
          <h3>Edit</h3>
          <div className="wrapper">
            <div className="left">
              <form>
                <label htmlFor="username">Username</label>
                <input placeholder="anabeck" type="text" id="username" />

                <label htmlFor="fullname">Full Name</label>
                <input placeholder="anna back" type="text" id="fullname" />

                <label htmlFor="email">Email</label>
                <input
                  placeholder="annaback@gmail.com"
                  type="text"
                  id="email"
                />

                <label htmlFor="phone">Phone</label>
                <input placeholder="06 98 75 32 45" type="text" id="phone" />

                <label htmlFor="address">Address</label>
                <input placeholder="New York | USA" type="text" id="adresse" />
              </form>
            </div>
            <div className="right">
              <div className="img">
                <img
                  src="https://www.verywellmind.com/thmb/IeZeA3IaM9a6P8df_hIdUpu4hw0=/500x350/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-4660327211-56b5fae93df78c0b13571d1e.jpg"
                  alt=""
                />
                <button>
                  <CloudUploadOutlined />
                </button>
              </div>
              <button className="btn__update">Update</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
