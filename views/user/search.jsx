const React = require('react');
const Default = require('../layout/Default');

class Search extends React.Component {

    render() {

        let profileUrl = "/users/" + this.props.cookie.userId;

        if (this.props.cookie.loginStatus !== this.props.cookie.check) {

            var otherInputs;
            var login = <div><a href="/login"><button>Login/Register</button></a></div>

        } else {

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

        }

        let displayUsers;

        if (this.props.users !== undefined) {

            displayUsers = this.props.users.map((element) => {

                const link = '/users/' + element.id

                return <a key={element.id} href={link}><h1>{element.username}</h1></a>
            });
        }

        return(

            <Default title="search">
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
                </aside>
                <main>
                    {displayUsers}
                    <a href="/"><button>Home</button></a>
                </main>
            </Default>
    )};
};

module.exports = Search;