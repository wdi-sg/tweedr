const React = require('react');
const DefaultLayout = require('../layout/DefaultLayout');

class All extends React.Component {
  render() {
    console.log(this.props.tweeds);
    const listItems = this.props.tweeds.map(tweed => {
      return (
        <li className="list-group-item clearfix">
          <span className="lead">{tweed.content}</span>
          <span className="float-right">
            {tweed.created.toString().substring(0, 25)}
          </span>
        </li>
      );
    });
    return (
      <DefaultLayout>
        <ul className="list-group-flush mt-5">{listItems}</ul>
      </DefaultLayout>
    );
  }
}

module.exports = All;
