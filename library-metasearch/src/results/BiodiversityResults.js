import React from 'react';

export default class BiodiversityResults extends React.Component {
  render() {
    let results = this.props.results || [];
    let subject_names = results.subject_names || [];

    return (
      <div>
        <h3>Biodiversity Results: {this.props.term}</h3>
        {subject_names.map(function (subject_name, index) {
          return (
            <div key={index}>{subject_name}</div>
          );
        })}
      </div>
    );
  }
}
