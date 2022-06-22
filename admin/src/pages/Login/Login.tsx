import "./login.scss";
import { ChangeEvent, useState } from "react";
import { UserModel } from "netflix-malet-types";
import { LoginService } from "./login.service";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

export default function Login() {
  const history = useHistory();
  const loginService = new LoginService();
  const [credential, setCredential] = useState({} as Partial<UserModel>);
  const dispatch = useDispatch();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredential((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const login = async () => {
    try {
      await loginService.signIn(credential, dispatch);
      history.push("/");
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="login">
      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <h1 className="form__title">Se connecter</h1>
        <div className="form__container">
          <label className="form__container__label" htmlFor="username">
            Username
          </label>
          <input
            onChange={handleChange}
            value={credential.username ?? ""}
            className="form__container__input"
            type="text"
            name="username"
          />
        </div>
        <div className="form__container">
          <label className="form__container__label" htmlFor="password">
            Password
          </label>
          <input
            onChange={handleChange}
            value={credential.password ?? ""}
            className="form__container__input"
            type="password"
            name="password"
          />
        </div>
        <button onClick={() => login()} className="form__btn">
          LOGIN
        </button>
      </form>
    </div>
  );
}
