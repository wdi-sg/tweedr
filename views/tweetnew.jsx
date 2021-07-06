var React = require('react');
var Defaultcss = require('./defaultcss');

class Tweetnew extends React.Component{
    render(){
        return(
            <Defaultcss>
                <div>
                    <form method="POST" action={"/users/tweet/" + this.props.list[0].id + "/add"}>
                    <h3>Create a new tweet: </h3><br />
                    Tweet user info:-
                    <br />
                    Name : {this.props.list[0].name}
                    <br />
                    Photo: <img src={this.props.list[0].photo_url} alt="broken link" height="270" width="270" /><br/><span>{this.props.list[0].photo_url}</span>
                    <br />
                    Nationality: {this.props.list[0].nationality}
                    <br />
                    Tweet content: <textarea class="form-control" id="exampleFormControlTextarea1" name="tweet"rows="3" required></textarea>
                    <br />
                    <button type="submit" class="btn btn-primary">Submit</button>
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

module.exports = Tweetnew;