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
    console.log(this.props.list)
    const users = this.props.list.map( user => {
            return <Details list={user}></Details>;
        });
    return (
        <Defaultcss>
            <h1>{this.props.user[0]} below are a list of your follows and followers.</h1>
            {users}
        </Defaultcss>
    );
  }
}

module.exports = Users;