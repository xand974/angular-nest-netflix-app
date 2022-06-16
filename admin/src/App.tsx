import Sidebar from "components/Sidebar/Sidebar";
import Topbar from "components/Topbar/Topbar";
import Home from "pages/Home/Home";
import "./app.scss";
import UserList from "pages/UserList/UserList";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import User from "pages/User/User";
import Add from "pages/AddUser/Add";
import ProductsList from "pages/ProductsList/ProductsList";
function App() {
  return (
    <div className="app">
      <Router>
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
            <Route path="/products" exact>
              <ProductsList />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
