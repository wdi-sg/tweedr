const React = require('react');
const Default = require('../layout/Default');

class EditTweet extends React.Component {

    render() {

        let actionUrl = '/tweet/' + this.props.tweet.id + '?_method=PUT';

        let date = new Date();
        date = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}  ${date.getHours()}:${date.getMinutes()}`;

        return(

            <Default title="Edit Tweet">
                <header>
                    <h1>TWEEDR</h1>
                </header>
                <h1>Edit Tweet</h1>
                <form method="POST" action={actionUrl}>
                    <h2>Title:</h2>
                    <input type="text" name="title" defaultValue={this.props.tweet.title} autoComplete="off" required/>
                    <h2>Message:</h2>
                    <textarea name="message" defaultValue={this.props.tweet.message} required></textarea>
                    <br/>
                    <input type="hidden" name="date" value={date} />
                    <input type="submit" value="Submit" />
                </form>
            </Default>
    )};
};

module.exports = EditTweet;