var React = require("react");

class Follow extends React.Component {
  render() {
        console.log("this.props is: ", this.props.cookie['Username']);
        //const value = this.props.cookie['Username'];
        var DefaultLayout = require('../layout/Default');


    return (
        <DefaultLayout>
            <h1>Who would you like to follow?</h1>
            <div className="user-attribute">
            <p>Follower's ID:</p>
            <form className="user-form" method="POST" action="/users/followed">
                <input type="text" name="name"/>
                <br/>
                <input name="submit" type="submit" />
            </form>
            </div>
        </DefaultLayout>
    );
  }
}

module.exports = Follow;
