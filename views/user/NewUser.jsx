const React = require('react');
const Header = require('../layouts/Header');

class NewUser extends React.Component {
    render() {
        return(
            <html>
            <Header/>
                <body>
                    <form className='user-form' method='POST' action='/users'>
                        <div>New User</div>
                        <div className='user-attribute'>
                            <input name='name' type='text' placeholder='Username'/>
                        </div>
                        <div className='user-attribute'>
                            <input name='password' type='text' placeholder='Password'/>
                        </div>
                        <input name='submit' type='submit'/>
                    </form>
                </body>
            </html>
        )
    }
}

module.exports = NewUser;