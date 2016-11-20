import React from 'react';

export default class WikiResults extends React.Component {
  render() {
    let results = this.props.results || [];
    let hits = results.titles || [];

    return (
      <div>
        <h3>Wikipedia Results: {this.props.term}</h3>
        {hits.map(function (hit, index) {
          return (
            <div key={index}>{hit}</div>
          );
        })}
      </div>
    );
  }
}
