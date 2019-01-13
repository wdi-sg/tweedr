var React = require("react");
var Defaultcss = require('./defaultcss');

class Details extends React.Component{
    render(){
        return(
            <div>
            <div className="modal fade" id={"exampleModal" + this.props.list.id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title text-danger" id="exampleModalLabel">WARNING!</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body text-danger">
                    You are about to delete a user from the database. Click <strong>close</strong> to return to main menu or click <strong>confirm</strong> to proceed with the deletion.
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <form method="POST" action={"/user/delete/" + this.props.list.id + "?_method=delete"}>
                        <button type="submit" value="Delete" className="btn btn-primary">Confirm</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
                <ul>{this.props.list.name}
                    <form method="POST" action={"/user/follow/" + this.props.list.id}>
                        <input type="submit" value="Follow" />
                    </form>
                    <input type="submit" className="delete" value="Delete" data-toggle="modal" data-target={"#exampleModal" + this.props.list.id}/>
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