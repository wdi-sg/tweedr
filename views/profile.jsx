var React = require("react");
var Defaultcss = require('./defaultcss');

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
                    <form method="GET" action={"/user/" + this.props.id}>
                        <input type="submit" className="new" value="Follow" />
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
    if(this.props.user !== undefined){
    const users = this.props.list.map( user => {
            return <Details list={user}></Details>;
        });
    const contents = this.props.contents.map( cont => {
                        return <Tweets list={cont}></Tweets>;
                        });
    return (
        <Defaultcss>
            <h1>This is your own profile {this.props.user[0]}</h1>
            <form method="GET" action="/">
                <input type="submit" className="new" value="Back" />
            </form>
            {users}
            <ul>{contents}</ul>
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
    return (
        <Defaultcss>
            <h1>This is profile</h1>
            <form method="GET" action="/">
                <input type="submit" className="new" value="Back" />
            </form>
            {users}
            <h4>Tweets made by user:-</h4>
            <ul>{contents}</ul>
        </Defaultcss>
    );
  }
}
}

module.exports = Profile;