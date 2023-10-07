import { Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";

// Components
import Store from "./components/Store";
import ShopCart from "./components/ShopCart";

// Redux
import store from "./apps/store";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Provider store={store}>
      <Navbar />
      <Switch>
        <Route path="/products" component={Store} />
        <Route path="/cart" component={ShopCart} />
        <Redirect to="/products" />
      </Switch>
    </Provider>
  );
}

export default App;
