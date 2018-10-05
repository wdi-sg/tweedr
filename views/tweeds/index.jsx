var React = require("react");
var Layout = require('../layout/layout');

class Index extends React.Component {
  render() {

		console.log(this.props.tweeds);
    
    let tweeds = this.props.tweeds.map(tweed => {			
			return (
        <div key={tweed.id} className="col-12">
          <div className="card p-2">
						<h4>{tweed.username}</h4>
            <p>{tweed.content} &mdash; {tweed.created_at}</p>  
          </div>
        </div>
      )
    });

    return (
      
      <Layout title="Tweedr" cookies={this.props.cookies}>
        <div className="col-12">
          <h1 className="my-4">All Tweeds</h1>
        </div>
          {tweeds}
      </Layout>
    )
  }
}

module.exports = Index;
