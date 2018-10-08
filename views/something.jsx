const React = require('react');
const DefaultLayout = require('./layout/DefaultLayout');

class Something extends React.Component {
  render() {
    return (
      <DefaultLayout>
          <script src="script.js" />

      </DefaultLayout>
    );
  }
}

module.exports = Something;
