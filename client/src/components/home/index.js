import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tweedContent: "",
      tweeds: [],
      redirect: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);

  }
  componentDidMount() {
    this.getTweeds();
  }
  handleChange(e) {
    let target = e.target;
    if ("tweedContent" === target.name) {
      this.setState({ [target.name]: target.value });
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    this.submitTweeds();
  }
  handleLogout() {
    console.log("logging out");
    localStorage.clear();
    console.log(this.state.redirect)
    this.setState({ redirect: true });
  }
  getTweeds() {
    fetch("/home", {
      method: "GET",
      headers: {
        "X-Access-Token": `Bearer ${localStorage.getItem("token")}`
      }
    }).then(res =>
      res.json().then(res => {
        res.tweeds.map(val => {
          this.setState(prevState => ({
            tweeds: [...prevState.tweeds, val]
          }));
        });
      })
    );
  }
  submitTweeds() {
    fetch("/tweeds/new", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "X-Access-Token": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({ content: this.state.tweedContent })
    }).then(res =>
      res.json().then(res => {
        console.log(res);
      })
    );
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    } else {
      if (localStorage.getItem("isLoggedIn")) {
        return (
          <div className="container-fluid">
            <div className="row">
              <div className="col">Tweedr</div>
              <button
                type="logout"
                onClick={this.handleLogout}
                className="btn btn-primary"
              >
                Logout
              </button>
            </div>
            <div className="row">
              <div className="col">
                <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
                  <div className="form-group">
                    <input
                      name="tweedContent"
                      type="text"
                      className="form-control"
                      id="inputTweed"
                      placeholder="What's on your mind?"
                    />
                    <button
                      type="submit"
                      value="Submit"
                      className="btn btn-primary"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
            {this.state.tweeds.map((val, idx) => {
              console.log(val);
              return (
                <div className="row" key={idx}>
                  {val.user}:{val.content} at {val.updatedAt}
                </div>
              );
            })}
          </div>
        );
      } else {
        return <Redirect to="/" />;
      }
    }
  }
}

export default Home;
