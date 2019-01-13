var React = require("react");
var Defaultcss = require('./defaultcss');

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

class Users extends React.Component {
  render() {
    if(this.props.user !== undefined){
    const users = this.props.list.map( user => {
            return <Details list={user}></Details>;
        });
    return (
        <Defaultcss>
            <h1>{this.props.user[0]} below are a list of your follows and followers.</h1>
            <form method="GET" action="/users/list">
                <input type="submit" className="new" value="List of Users" />
            </form>
            {users}
        </Defaultcss>
    );
  }
    else{
    const users = this.props.list.map( user => {
            return <Details list={user}></Details>;
        });
    return (
        <Defaultcss>
            <h1>Below is the is the whole list of users registered on our website</h1>
            <form method="GET" action="/users">
                <input type="submit" className="new" value="Back" />
            </form>
            {users}
        </Defaultcss>
    );
    }
}
}

module.exports = Users;