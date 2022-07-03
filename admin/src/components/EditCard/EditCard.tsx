import { InfoCardType } from "components/InfoCard/InfoCard";
import "./edit-card.scss";

export default function EditCard({ data }: InfoCardType) {
  return (
    <div className="edit">
      <h3 className="edit__title">Edit</h3>
      <div className="wrapper">
        <div className="left">
          <form className="left__form">
            <label htmlFor="username" className="left__form__label">
              Username
            </label>
            <input
              placeholder={data.username}
              className="left__form__input"
              type="text"
              id="username"
            />

            <label htmlFor="fullname" className="left__form__label">
              Full Name
            </label>
            <input className="left__form__input" type="text" id="fullname" />

            <label htmlFor="email" className="left__form__label">
              Email
            </label>
            <input
              placeholder={data.email}
              type="text"
              id="email"
              className="left__form__input"
            />
          </form>
        </div>
        <div className="right">
          <div className="img">
            <label htmlFor="picture" className="img__label">
              <img src={data.photoURL} alt="" className="img__label__picture" />
            </label>
            <input type="file" id="picture" className="right__input" />
          </div>
          <button className="btn__update">Update</button>
        </div>
      </div>
    </div>
  );
}
