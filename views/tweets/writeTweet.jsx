const React = require('react');
const Header = require('../layouts/Header');

class writeTweet extends React.Component {
    render() {
        return(
            <html>
                <Header cookies={this.props.cookies}/>
                <body>
                    <form className='user-form' method='POST' action='/tweets'>
                        <div className='user-attrinbute'>
                            <input name='tweet' type='text' placeholder='Tweet!'/>
                            <input hidden name='id' value={this.props.cookies.id}/>
                            <input type='submit' name='submit'/>
                        </div>
                    </form>
                </body>
            </html>
        );
    };
};

module.exports = writeTweet;