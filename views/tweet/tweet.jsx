const React = require('react');
const Default = require('../layout/Default');

class Tweet extends React.Component {

    render() {

        let authorUrl = '/users/' + this.props.tweet.user_id;
        let editUrl = '/tweet/' + this.props.tweet.id + '/edit';
        let deleteUrl = '/tweet/' + this.props.tweet.id + '?_method=delete';
        let profileUrl = "/users/" + this.props.cookie.userId;

        if (this.props.cookie.loginStatus !== this.props.cookie.check) {

            var otherInputs;
            var login = <div><a href="/login"><button>Login/Register</button></a></div>
            var priviledges;
            var actions;

        } else {

            var priviledges = <div><a href={profileUrl}><button>Profile</button></a><br/>
                <a href="/tweet/new"><button>Create Text Tweet</button></a><br/>
                <a href="/tweet/new/image"><button>Create Image Tweet</button></a></div>
            var login = <div>
                <form method="POST" action="/">
                    <span>{this.props.cookie.username} </span>
                    <input type="submit" value="Log Out" />
                </form>
                </div>
            var otherInputs = <div>
                <input type="radio" name="users" value="followers" /> Followers <br/>
                <input type="radio" name="users" value="following" /> Following<br/>
                </div>

            if (this.props.tweet.user_id == this.props.cookie.userId){

                if(this.props.tweet.image === '') {
                    var actions = <span><a href={editUrl}><button>Edit</button></a>
                        <form method="POST" action={deleteUrl}><input type="submit" value="Delete" /></form>
                        </span>
                } else {
                    var actions = <span><form method="POST" action={deleteUrl}><input type="submit" value="Delete" /></form></span>
                }

            } else {
                var actions;
            }

        }

        if(this.props.tweet.image === '') {

            var showContent = <div><h1>{this.props.tweet.title}</h1>
                    <h3>{this.props.tweet.message}</h3>
                    </div>
        } else {

            var showContent = <img height="500px" width="500px" src={this.props.tweet.image} />
        }

        return(

            <Default title="tweet">
                <header>
                    <h1>TWEEDR</h1>
                    {login}
                </header>
                <aside>
                    <h2>Find Users:</h2>
                    <form className="search" method="GET" action="/search">
                        <input type="radio" name="users" value="all" /> All
                        {otherInputs}
                        <input type="submit" value="Search" />
                    </form>
                    {priviledges}
                </aside>
                <main>
                    {showContent}
                    <p>Created By: <a href={authorUrl}>{this.props.tweet.username}</a> <span>{this.props.tweet.dateandtime}</span></p>
                    {actions}
                    <a href="/"><button>Home</button></a>
                </main>
            </Default>
    )};
};

module.exports = Tweet;