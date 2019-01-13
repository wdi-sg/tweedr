var React = require("react");
var Default = require("../DefaultLogged");

class Profile extends React.Component {
  render() {
    

    return (
        <Default>
        <form className="user-form" method="POST" action="/profile">
            <div className="input-group">
                <input name="tweet" type="text" className="form-control" placeholder="Tweet tweet~" aria-label="" aria-describedby="basic-addon1"/>
                <div className="input-group-append">
                    <button className="btn btn-secondary" type="button">Tweet</button>
                </div>
            </div>
        </form>

        <ul className="list-group">
            <li className="list-group-item">Cras justo odio</li>
            <li className="list-group-item">Dapibus ac facilisis in</li>
            <li className="list-group-item">Morbi leo risus</li>
        </ul>

        </Default>
    );
  }
}

module.exports = Profile;
