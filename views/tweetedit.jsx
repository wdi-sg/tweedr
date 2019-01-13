var React = require('react');
var Defaultcss = require('./defaultcss');

class Tweetedit extends React.Component{
    render(){
        return(
            <Defaultcss>
                <div>
                    <div className="alert alert-danger alert-dismissible fade show text-white" role="alert">
                      <strong>Please Read!</strong><br /> The values you see in the text box are originally from the server. Check before clicking the edit button.
                      <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <form method="POST" action={"/tweet/" + this.props.list[0].id + "?_method=PUT"}>
                    <h3>Edit tweet ID {this.props.list[0].id}: </h3><br />
                    Tweet content:
                    <textarea class="form-control" id="exampleFormControlTextarea1" name="tweet"rows="3" defaultValue={this.props.list[0].content} required></textarea>
                    <input type="submit" value="Edit" /><br />
                    </form>
                    <br />
                    <br />
                    <form method="GET" action="/">
                        <input type="submit" value="Back" />
                    </form>
                </div>
            </Defaultcss>
            );
    }
}

module.exports = Tweetedit;