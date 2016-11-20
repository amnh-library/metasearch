import React from 'react';

export default class WikiResults extends React.Component {
  render() {
    let result = this.props.result || {};

    return (
      <div>
        <h3>Wiki Results: <a href={result.page_url}>{result.title}</a></h3>
        <div>
          <div><i>... {result.snippet} ...</i></div>
          <img id="wiki-img" src={result.image_url} alt={result.title}/>
        </div>
      </div>
    );
  }
}
