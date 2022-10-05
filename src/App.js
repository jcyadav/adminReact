import { Switch, Route, Redirect } from "react-router-dom";
import React from "react";
import "./App.css";
import Home from "../src/Components/Home/Home";
import AdminLogin from "./Components/AdminLogin/AdminLogin";
import EmailVerify from "./Components/AdminLogin/EmailVerify";
import Resetpassword from "./Components/AdminLogin/Resetpassword";


//for notification
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import ProtectedRoute from "./Components/utils/ProtectedRoute";
import AddCategory from "./Components/Pages/AddCategory/AddCategory";
import CreateCategory from "./Components/Pages/AddCategory/CreateCategory";
import User from "./Components/Pages/User";
import AddCollection from "./Components/Pages/AddCollection/AddCollection";
import CreateCollection from "./Components/Pages/AddCollection/CreateCollection";
import AddProduct from "./Components/Pages/AddProduct/AddProduct";
import CreateProduct from "./Components/Pages/AddProduct/CreateProduct";
import AddCoupon from "./Components/Pages/Coupon/AddCoupon";
import CreateCoupon from "./Components/Pages/Coupon/CreateCoupon";
function App() {
  return (
    <>
      <ReactNotification />
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/" component={AdminLogin} />
        <Route exact path="/emailverify" component={EmailVerify} />
        <Route exact path="/resetpassword" component={Resetpassword} />
        <Route exact path="/user" component={User} />
        <Route exact path="/category" component={AddCategory} />
        <Route exact path="/createcategory" component={CreateCategory} />
        <Route exact path="/collection" component={AddCollection} />
        <Route exact path="/createcollection" component={CreateCollection} />
        <Route exact path="/addproduct" component={AddProduct} />
        <Route exact path="/createproduct" component={CreateProduct} />
        <Route exact path="/coupon" component={AddCoupon} />
        <Route exact path="/createcoupon" component={CreateCoupon}/>
      </Switch>
    </>
  );
}

export default App;
