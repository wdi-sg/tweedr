import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tweedContent: "",
      tweeds: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    if (localStorage.getItem("isLoggedIn")) {
      return (
        <div className="container-fluid">
          <div className="row">
            <div className="col">Tweedr</div>
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
            {this.state.tweeds.map((val,idx)=>{
              console.log(val)
              return (<div className="row" key={idx}>{val.user}:{val.content} at {val.updatedAt}</div>)
            })}
        </div>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}

export default Home;
