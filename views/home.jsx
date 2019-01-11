var React = require("react");
var DefaultLayout = require('./layouts/default');

class Home extends React.Component {
  render() {

    const tweets = this.props[0].map( (tweet) => {
        return (
            <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">{tweet.id}</h5>
                    <small>{`${tweet.tweeted_on}`}</small>
                </div>
                <p class="mb-1">{tweet.content}</p>
                <small>Created By</small>
            </a>
        );
    });

    return (
        <DefaultLayout>
            <div class="list-group">
                {tweets}
            </div>
        </DefaultLayout>
    );
  }
}

module.exports = Home;
