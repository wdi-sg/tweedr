const React = require('react');
const Header = require('../layouts/Header');

class loginpage extends React.Component {
  render() {
    return(
      <html>
        <Header cookies={this.props.cookies} />
        <body>
          <form className='user-form' method='POST' action='/users/login'>
            <div className='user-attribute'>
              <input name='name' type='text' placeholder='Username'/>
            </div>
            <div className='user-attribute'>
              <input name='password' type='password' placeholder='Password'/>
            </div>
              <input name='submit' type='submit'/>
         </form>
        </body>
       </html>
    )
  }
}

module.exports = loginpage;