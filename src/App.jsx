import { Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";

// Components
import Store from "./components/Store";
import ShopCart from "./components/ShopCart";

// Redux
import store from "./apps/store";
import Login from "./components/Login";
import Admin from "./components/Admin";

function App() {
  return (
    <Provider store={store}>
      <Switch>
        <Route path="/products" component={Store} />
        <Route path="/cart" component={ShopCart} />
        <Route path="/login" component={Login} />
        <Route path="/Admin" component={Admin} />
        <Redirect to="/products" />
      </Switch>
    </Provider>
  );
}

export default App;
