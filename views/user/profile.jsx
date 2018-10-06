const React = require('react');
const Default = require('../layout/Default');

class Profile extends React.Component {

    render() {

        console.log(this.props.user.followed);
        let editUrl = '/users/' + this.props.user.id + '/edit';
        let deleteUrl = '/users/' + this.props.user.id + '?_method=delete';
        let followUrl = '/follow/' + this.props.user.id;
        let unfollowUrl = '/unfollow/' + this.props.user.id + '?_method=delete';

        if (this.props.cookie.loginStatus !== this.props.cookie.check) {

            var otherInputs;
            var login = <div><a href="/login"><button>Login/Register</button></a></div>
            var priviledges;
            var actions;
            var follow;

        } else {

            var priviledges = <div><a href="/tweet/new"><button>Create Tweet</button></a></div>
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

            if (this.props.user.id == this.props.cookie.userId){
                var actions = <span><a href={editUrl}><button>Edit</button></a>
                    <form method="POST" action={deleteUrl}><input type="submit" value="Delete" /></form>
                    </span>
                var follow;
            } else {
                var actions;
                if(this.props.user.followed === false) {
                    var follow = <form method="POST" action={followUrl}><input type="submit" value="Follow" /></form>
                } else {
                    var follow = <form method="POST" action={unfollowUrl}><input type="submit" value="Unfollow" /></form>
                }

            }

        }

        if (this.props.user.age === null) {
            var age = "Not Stated."
        } else {
            var age = this.props.user.age;
        }

        if (this.props.user.description === null) {
            var description = "No Description Available."
        } else {
            var description = this.props.user.description;
        }

        return(

            <Default title="Profile">
                <header>
                    <h1>TWEEDR</h1>
                    {login}
                </header>
                <aside>
                    <form className="search" method="GET" action="/search">
                        <input type="text" name="user" placeholder="Search a user" autoComplete="off" />
                        <input type="submit" value="Search" />
                        {otherInputs}
                    </form>
                    {priviledges}
                </aside>
                <div>
                    <h1>Username</h1>
                    <h2>{this.props.user.username}</h2>
                    <h1>Age</h1>
                    <h2>{age}</h2>
                    <h1>Description</h1>
                    <h2>{description}</h2>
                    {actions}
                    {follow}
                </div>
            </Default>
    )};
};

module.exports = Profile;