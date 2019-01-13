import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/home";
import Landing from "./components/landing";

class App extends Component {
  state = {
    isLoggedIn: localStorage.getItem("isLoggedIn"),
    token: localStorage.getItem("token")
  };

  componentDidMount() {
    if (this.state.isLoggedIn) {
      console.log("fetching");
      fetch("/validate", {
        method: "GET",
        headers: {
          "X-Access-Token": `Bearer ${this.state.token}`
        }
      }).then(res =>
        res.json().then(res => {
          console.log(res)
          console.log(res.success);

          if (!res.success) {
            console.log(res.success);
               localStorage.clear();
          }
        })
      );
    }
  }

  render() {
    return (
      <Switch>
        <Route exact path="/home" render={() => <Home />} />
        <Route exact path="/" render={() => <Landing values={this.state} />} />
      </Switch>
    );
  }
}

export default App;
