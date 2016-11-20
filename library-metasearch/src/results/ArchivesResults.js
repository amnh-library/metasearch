import React from 'react';

export default class ArchivesResults extends React.Component {
  render() {
    let results = this.props.results || {};

    if (results.length > 0) {
    return (
      <div>
        <div>
        <h4>Matches:</h4>
        {results.map(function (result, index) {
          return (<div key={result.title}>
            <a href={result.url}>{result.title}</a>
          </div>)
        })}
        </div>
      </div>
    );
    }
  }
}
