var React = require('react')
var Default = require('./default')

class Profile extends React.Component {
    render() {
        return (
            <Default>
                <form className="display" method="POST" action="/users/profile" encType="multipart/formdata">
                FILE<br/>
                <input type="file" value="myFile" name="file"/><br/>
                OR DO input onChange="this.form.submit()"<br/>
                <input type="submit" value="submit" />
                </form>
            </Default>
        )
    }
}

module.exports = Profile;