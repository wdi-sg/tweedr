const React = require('react');
const Default = require('../layout/Default');

class EditProfile extends React.Component {

    render() {

        let actionUrl = '/users/' + this.props.user.id + '?_method=PUT';

        return(

            <Default title="Edit Profile">
                <form method="POST" action={actionUrl}>
                    <h1>Username</h1>
                    <input type="text" name="username" defaultValue={this.props.user.username} readOnly />
                    <h1>Age</h1>
                    <input type="number" name="age" defaultValue={this.props.user.age} />
                    <h1>Description</h1>
                    <textarea name="description" defaultValue={this.props.user.description}></textarea>
                    <br/><br/>
                    <input type="submit" value="Submit" />
                </form>
            </Default>
    )};
};

module.exports = EditProfile;