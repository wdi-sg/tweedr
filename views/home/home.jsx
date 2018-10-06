const React = require('react');
const Default = require('../layout/Default')

class Home extends React.Component {

    render() {

        let profileUrl = "/users/" + this.props.cookie.userId;

        if (this.props.cookie.loginStatus !== this.props.cookie.check) {

            var otherInputs;
            var login = <div><a href="/login"><button>Login/Register</button></a></div>
            var priviledges;

        } else {

            var priviledges = <div><h2>Show Tweets:</h2><form method="GET" action="/">
                <div><input type="radio" name="show" value="all" defaultChecked/> All</div>
                <div><input type="radio" name="show" value="followers" /> Followers</div>
                <div><input type="radio" name="show" value="following" /> Following</div>
                <input type="submit" value="Sort" />
                </form> <br/>
                <a href={profileUrl}><button>Profile</button></a><br/>
                <a href="/tweet/new"><button>Create Tweet</button></a>
                </div>
            var login = <div>
                <form method="POST" action="/">
                    <span>{this.props.cookie.username} </span>
                    <input type="submit" value="Log Out" />
                </form>
                </div>
            var otherInputs = <div>
                <input type="checkbox" name="follower" value="true" /> Search for your followers <br/>
                <input type="checkbox" name="following" value="true" /> Search for users you following<br/>
                </div>

        }

        var tweet;

        if (this.props.tweet !== undefined) {

            tweet = this.props.tweet.map((element) => {

                let tweetUrl = "/tweet/" + element.id;
                let authorUrl = "/users/" + element.user_id;

                return <a key={element.id} href={tweetUrl}><div><h3>{element.title}</h3><p className="message">{element.message}</p><p>Created by: <a href={authorUrl}>{element.username}</a> {element.dateandtime}</p></div></a>

            });

        }

        return(

            <Default title="Tweedr">
                <header>
                    <h1>TWEEDR</h1>
                    {login}
                </header>
                <aside>
                    <h2>Find Users:</h2>
                    <form className="search" method="GET" action="/search">
                        <input type="text" name="user" placeholder="Search a user" autoComplete="off" />
                        <input type="submit" value="Search" />
                        {otherInputs}
                    </form>
                    {priviledges}
                </aside>
                <main>
                    {tweet}
                </main>
            </Default>
    )};

};

module.exports = Home;