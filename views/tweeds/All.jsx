const React = require('react');
const DefaultLayout = require('../layout/DefaultLayout');

class All extends React.Component {
  render() {
    console.log(this.props.tweeds);
    const listItems = this.props.tweeds.map(tweed => {
      return (
        <li>
          {tweed.content}, {tweed.created.toString()}
        </li>
      );
    });
    return (
      <DefaultLayout>
        <ul>{listItems}</ul>
      </DefaultLayout>
    );
  }
}

module.exports = All;
