var React = require("react");
var NavBar = require('./NavBar');

class Home extends React.Component {
  render() {

    let tweets = this.props.list.map( tweets => {

        let date = tweets.created_at.toString();

        return (
            <p key={tweets.id}>
               {tweets.name} tweeted:"{tweets.tweet}" on {date}.
               <a href={"/user/follow/" + tweets.user_id} className="btn btn-info ml-2" >
                Follow User
              </a>
            </p>
            );
        });

    return (
      <NavBar>
        <form method="POST" action={"/sortby"} id="followeeForm">
          <select className="custom-select" name="sort">
            <option selected>Choose...</option>
            <option value="dateAsc">
              Date Ascending
            </option>
            <option value="dateDesc">
              Date Descending
            </option>
          </select>
          <div className="input-group-append">
            <button className="btn btn-outline-info" type="submit">Sort Tweets</button>
          </div>
        </form>
        {tweets}
      </NavBar>
    );
  }
}

module.exports = Home;