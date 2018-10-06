const React = require('react');
const Default = require('../layout/Default');

class CreateTweet extends React.Component {

    render() {

        let date = new Date();
        date = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}  ${date.getHours()}:${date.getMinutes()}`;

        return(

            <Default title="Create Tweet">
                <header>
                    <h1>TWEEDR</h1>
                </header>
                <h1>Create New Tweet</h1>
                <form method="POST" action="/tweet">
                    <h2>Title:</h2>
                    <input type="text" name="title" autoComplete="off" />
                    <h2>Message:</h2>
                    <textarea name="message"></textarea>
                    <br/>
                    <input type="hidden" name="date" value={date} />
                    <input type="submit" value="Submit" />
                </form>
            </Default>
    )};
};

module.exports = CreateTweet;