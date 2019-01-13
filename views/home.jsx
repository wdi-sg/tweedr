var React = require("react");
var DefaultLayout = require('./layouts/default');

class Home extends React.Component {
  render() {

    const buttonsFalse = () => {
        return (
            <div>
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#signInModal">
                  Sign In
                </button>
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#signUpModal">
                  Sign Up
                </button>
            </div>
            );
    };
    const buttonsTrue = () => {
        return (
            <div>
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#signInModal">
                  Sign Out
                </button>
            </div>
            );
    };

    const tweetForm = () => {
        return (
                <div>
                    <h2>{this.props[2][0].name}</h2>
                    <hr class="my-4"/>
                    <div class="d-flex w-100 justify-content-between">
                        <input class="w-100" type="text" placeholder="Tweet!"/>
                        <a class="btn btn-primary btn-md ml-4" href="#" role="button">Learn more</a>
                    </div>
                </div>
            );
    };

    const tweets = this.props[0].map( (tweet, i) => {
        return (
            <a href={`localhost:3000/${tweet.name}`} class="list-group-item list-group-item-action flex-column align-items-start">
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">{i + 1}</h5>
                </div>
                <div class="d-flex w-100 p-3 justify-content-center">
                    <h4 class="mb-1">{tweet.content}</h4>
                </div>
                <div class="d-flex w-100 justify-content-between">
                    <small>Tweeted By: <b>{tweet.name}</b></small>
                    <small>{`${tweet.tweeted_on}`}</small>
                </div>
            </a>
        );
    });

    return (
        <DefaultLayout  buttons={(this.props[1] == 'true') ? buttonsTrue : buttonsFalse}>
            <div class="jumbotron">
                <h1 class="display-4">Welcome to Tweedr!</h1>
                {(this.props[1] == 'true') ? tweetForm() : null}
            </div>
            <div class="list-group">
                {tweets}
            </div>
        </DefaultLayout>
    );
  }
}

module.exports = Home;
