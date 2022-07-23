import Sidebar from "components/Sidebar/Sidebar";
import Topbar from "components/Topbar/Topbar";
import Home from "pages/Home/Home";
import "./app.scss";
import UserList from "pages/UserList/UserList";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import User from "pages/User/User";
import Add from "pages/AddUser/Add";
import MovieList from "pages/MovieList/MovieList";
import Login from "pages/Login/Login";
import { useAppSelector } from "./context/hooks";
import { useEffect, useRef } from "react";
import { LoginService } from "./pages/Login/login.service";
import { useDispatch } from "react-redux";
import List from "./pages/List/List";
function App() {
  const { currentUser } = useAppSelector((state) => state.user);
  const loginService = useRef(new LoginService());
  const dispatch = useDispatch();

  useEffect(() => {
    const init = async () => {
      const isAuth = await loginService.current.checkAuth();
      if (!currentUser || !isAuth) {
        await loginService.current.signOut(dispatch);
        return;
      }
    };
    init();
  }, [currentUser, dispatch, loginService]);

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/login" exact>
            {currentUser ? <Redirect to="/" /> : <Login />}
          </Route>
        </Switch>
        {currentUser ? (
          <>
            <Topbar />

            <div className="wrapper">
              <Sidebar />
              <Switch>
                <Route path="/" exact>
                  <Home />
                </Route>
                <Route path="/users" exact>
                  <UserList />
                </Route>
                <Route path="/user/:id" exact>
                  <User />
                </Route>
                <Route path="/add" exact>
                  <Add />
                </Route>
                <Route path="/films" exact>
                  <MovieList />
                </Route>
                <Route path="/list" exact>
                  <List />
                </Route>
              </Switch>
            </div>
          </>
        ) : (
          <Redirect to="/login" />
        )}
      </div>
    </Router>
  );
}

export default App;
