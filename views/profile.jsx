var React = require("react");
var Defaultcss = require('./defaultcss');

class Followers extends React.Component{
    render(){
        return(
            <div>
                {this.props.list.name}
            </div>
            );
    }
}

class Follows extends React.Component{
    render(){
        return(
            <div>
                {this.props.list.name}
            </div>
            );
    }
}

class Tweets extends React.Component{
    render(){
        return(
            <div>
                {this.props.list.content}
            </div>
            );
    }
}

class Details extends React.Component{
    render(){
        return(
            <div>
                <ul>{this.props.list.name}
                    <form method="POST" action={"/user/follow/" + this.props.list.id}>
                        <input type="submit" value="Follow" />
                    </form>
                </ul>
                <ul><img src={this.props.list.photo_url} alt="broken link" height="270" width="270" /><br/><span>{this.props.list.photo_url}</span></ul>
                <ul>{this.props.list.nationality}</ul>
            </div>
            );
    }
}

class Profile extends React.Component {
  render() {
    if(this.props.list == undefined){
        return (
        <Defaultcss>
            <h1>Please go and sign in before entering this page.</h1>
            <form method="GET" action="/">
                <input type="submit" className="new" value="Back" />
            </form>
        </Defaultcss>
    );
    }
    else if(this.props.user !== undefined){
    const users = this.props.list.map( user => {
            return <Details list={user}></Details>;
        });
    const contents = this.props.contents.map( cont => {
            return <Tweets list={cont}></Tweets>;
            });
    const follows = this.props.followsName.map( follow => {
            return <Follows list={follow}></Follows>;
            });
    const followers = this.props.followersName.map( follower => {
            return <Followers list={follower}></Followers>;
            });
    return (
        <Defaultcss>
            <h1>This is your own profile {this.props.user[0]}</h1>
            {users}
            <h4>Tweets made by this user:-</h4>
            <ul>{contents}</ul>
            <h4>Users that {this.props.user[0]} is following:-</h4>
            <ul>{follows}</ul>
            <h4>Users that is following {this.props.list[0].name}:-</h4>
            <ul>{followers}</ul>
            <form method="GET" action="/">
                <input type="submit" className="new" value="Back" />
            </form>
        </Defaultcss>
    );
  }
  else{
    const users = this.props.list.map( user => {
            return <Details list={user}></Details>;
        });
    const contents = this.props.contents.map( cont => {
            return <Tweets list={cont}></Tweets>;
            });
    const follows = this.props.followsName.map( follow => {
            return <Follows list={follow}></Follows>;
            });
    const followers = this.props.followersName.map( follower => {
            return <Followers list={follower}></Followers>;
            });
    return (
        <Defaultcss>
            <h1>This is {this.props.list[0].name}'s profile</h1>
            {users}
            <h4>Tweets made by this user:-</h4>
            <ul>{contents}</ul>
            <h4>Users that {this.props.list[0].name} is following:-</h4>
            <ul>{follows}</ul>
            <h4>Users that is following {this.props.list[0].name}:-</h4>
            <ul>{followers}</ul>
            <form method="GET" action="/">
                <input type="submit" className="new" value="Back" />
            </form>
        </Defaultcss>
    );
  }
}
}

module.exports = Profile;