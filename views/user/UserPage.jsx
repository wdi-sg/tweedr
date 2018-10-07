var React = require("react");


class ListMaker extends React.Component {
  render() {



    return (
            <li>
                {this.props.items.id}:
                {this.props.items.tweet}
            </li>
    );
  }
}





class UserPage extends React.Component {
  render() {
    let username = this.props.playerdata.username

    let actionUrl = "/userpage/" + username + "/tweet"
    console.log("Redirect action url: ", actionUrl)

    let arrayOfTweets = this.props.playerdata.queryResult.rows;

    let tweets = arrayOfTweets.map( (item, index)=>{
        return (<ListMaker items = {item}></ListMaker>)
    });

    return (
      <html>
        <head />
        <body>
            <h1>{username}</h1>

            <h1>Tweet Something</h1>
            <form method="POST" action={actionUrl}>
                <input type="text" name="tweet" placeholder="enter tweet"/>
                <input type="hidden" name="username" value={username}/>
                <input type="submit" value="tweet"/>

                <ul>{tweets}</ul>
            </form>

        </body>
      </html>
    );
  }
}

module.exports = UserPage;