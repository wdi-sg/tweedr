var React = require("react");
var Defaultcss = require('./defaultcss');

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

class Users extends React.Component {
  render() {
    const users = this.props.list.map( user => {
            return <Details list={user}></Details>;
        });
    return (
        <Defaultcss>
            <h1>All Users</h1>
            {users}
        </Defaultcss>
    );
  }
}

module.exports = Users;