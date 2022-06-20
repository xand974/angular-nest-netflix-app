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
import ProductsList from "pages/ProductsList/ProductsList";
import Login from "pages/Login/Login";
function App() {
  const currentUser = false;
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
                  <ProductsList />
                </Route>
                <Route path="/list" exact>
                  <ProductsList />
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
