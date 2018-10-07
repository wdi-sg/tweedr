const React = require('react');
const Default = require('../layout/Default');

class Profile extends React.Component {

    render() {

        const editUrl = '/users/' + this.props.user.id + '/edit';
        const deleteUrl = '/users/' + this.props.user.id + '?_method=delete';
        const followUrl = '/follow/' + this.props.user.id;
        const unfollowUrl = '/unfollow/' + this.props.user.id + '?_method=delete';
        const uploadActionLink = '/users/' + this.props.user.id + '/upload?_method=PUT';
        const name = this.props.user.username;
        var imageLink = this.props.user.image ;


        if (this.props.cookie.loginStatus !== this.props.cookie.check) {

            var otherInputs;
            var login = <div><a href="/login"><button>Login/Register</button></a></div>
            var priviledges;
            var actions;
            var follow;
            var uploadImage;

        } else {

            var priviledges = <div><a href="/tweet/new"><button>Create Tweet</button></a></div>
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

            if (this.props.user.id == this.props.cookie.userId){
                var actions = <span><a href={editUrl}><button>Edit</button></a>
                    <form method="POST" action={deleteUrl}><input type="submit" value="Delete" /></form>
                    </span>
                var follow;
                var uploadImage = <form method="POST" action={uploadActionLink} encType="multipart/form-data">
                        <h3>Change Profile Picture:</h3>
                        <input type="file" name="profilePic" /><br/>
                        <input type="submit" value="Submit" />
                    </form>
            } else {
                var actions;
                var uploadImage;
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

        let followers = <li>No Followers</li>;

        if (this.props.user.followers.length !== 0) {

            followers = this.props.user.followers.map((element) => {
                return <li key={element.username}>{element.username}</li>
            });
        }

        let following = <li>Not Following Anyone</li>;

        if (this.props.user.following.length !== 0) {

            following = this.props.user.following.map((element) => {
                return <li key={element.username}>{element.username}</li>
            });
        }

        return(

            <Default title="Profile">
                <header>
                    <h1>TWEEDR</h1>
                    {login}
                </header>
                <aside>
                    <form className="search" method="GET" action="/search">
                        <input type="radio" name="users" value="all" /> All
                        {otherInputs}
                        <input type="submit" value="Search" />
                    </form>
                    {priviledges}
                </aside>
                <div>
                    <img height="250px" width="250px" src={imageLink} />
                    {uploadImage}
                    <h1>Username</h1>
                    <h2>{this.props.user.username}</h2>
                    <h1>Age</h1>
                    <h2>{age}</h2>
                    <h1>Description</h1>
                    <h2>{description}</h2>
                    <h1>People Who Follow {name}</h1>
                    {followers}
                    <h1> People Who {name} Follow</h1>
                    {following}
                    <br/>
                    {actions}
                    {follow}
                    <a href='/'><button>Home</button></a>
                </div>
            </Default>
    )};
};

module.exports = Profile;