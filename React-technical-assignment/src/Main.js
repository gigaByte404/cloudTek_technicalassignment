
import React, { Component } from "react";


/*
  *Using React Router to Create a
  Single Page Application (SPA)
*/
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Home from "./Home";
import AddCoupon from "./AddCoupon";
import AboutMe from "./AboutMe";

class Main extends Component {
    render() {
      return (
        <HashRouter>
            <div>
                <h1>Stripe Coupons</h1>
                <ul className="header">
                    <li><NavLink exact to="/">Show All Coupons</NavLink></li>
                    <li><NavLink to="/add">Add Coupon</NavLink></li>
                    <li><NavLink to="/about">About</NavLink></li>                    
                </ul>
                <div className="content">
                    <Route exact path="/" component={Home}/>
                    <Route path="/add" component={AddCoupon}/>
                    <Route path="/about" component={AboutMe}/>                
                </div>
            </div>
          </HashRouter>
      );
    }
  }
   
  export default Main;