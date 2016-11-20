import React from 'react';

export default class WikiResults extends React.Component {
  render() {
    let result = this.props.result || {};

    return (
      <div>
        <h3>Wiki Results: {this.props.term}</h3>
        <div>
          <div>{result.title}</div>
          <img id="wiki-img" src={result.image_url} />
        </div>
      </div>
    );
  }
}
