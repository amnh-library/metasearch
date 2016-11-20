import React from 'react';

export default class SierraResults extends React.Component {
  render() {
    let results = this.props.results || [];

    return (
      <div>
        <h3>Sierra Results: {this.props.term}</h3>
        {JSON.stringify(results)}
      </div>
    );
  }
}
