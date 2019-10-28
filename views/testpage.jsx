var React = require("react");

class Testpage extends React.Component {
  render() {
    // let nameofuser = this.props.passObj[0][0].name;
    // let userObj = this.props.passObj[0][1];
    // let tweetObj = this.props.passObj[0][2];
    // let followObj = this.props.passObj[0][3];

    // const tweets = tweetObj.map((obj, index) => {
    //   return (
    //     <p className="lead">{obj.tweet}</p>
    //   )
    // })

    const allTweets = this.props.allTweets.map((obj, index) => {
      return (
        <p>{obj.tweet}</p>
      )
    })
    return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
            integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
            crossOrigin="anonymous"
          />
          <link rel="stylesheet" href="../style.css" />
          <title>Tweedr</title>
        </head>
        <body>
          <ul className="nav nav-pills navHeight sticky-top" style={{ background: "lightgrey", height: "3.5rem" }}>
            {/* <li className="nav-item" style={{ margin: "auto 5px" }}>
              <a className="nav-link active" href="/artist/">
                Login
              </a>
            </li> */}
          </ul>
          <div className="jumbotron">
            <h1 className="display-4 text-center">Hello!</h1>
            <form action="/newtweet" method="post">
              <div className="form-group">
                <label htmlFor="instrucTextArea">New Tweet</label>
                <textarea
                  name="tweet"
                  className="form-control"
                  id="instrucTextArea"
                  rows="6"
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
              >
                Submit
              </button>
            </form>
            <hr className="my-4" />
            {allTweets}
          </div>
          <script
            src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
            integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
            crossOrigin="anonymous"
          />
          <script
            src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"
            integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49"
            crossOrigin="anonymous"
          />
          <script
            src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"
            integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy"
            crossOrigin="anonymous"
          />
        </body>
      </html >
    );
  }
}

module.exports = Testpage;
