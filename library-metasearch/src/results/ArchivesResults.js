import React from 'react';

export default class ArchivesResults extends React.Component {
  render() {
    let results = this.props.results || {};

    if (results.length > 0) {
    return (
      <div>
        <div className='archives'>
        {results.map(function (result, index) {
          let typeClass = (result.type == "agent_person") ? "person" : "default";

          return (<div key={result.title} className={typeClass}>
            <a href={result.url}>{result.title}</a>
          </div>)
        })}
        </div>
      </div>
    );
    }
  }
}
