import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class Home extends Component {
  render() {
    if (localStorage.getItem("isLoggedIn")) {
      return <div>Home</div>;
    } else {
      return <Redirect to="/" />;

    }
  }
}

export default Home;
