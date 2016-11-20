import React from 'react';

export default class WikiResults extends React.Component {
  render() {
    let result = this.props.result || {};

    return (
      <div>
        <div>
          <a href={result.page_url}>
            <img id="wiki-img" src={result.image_url} alt={result.title}/>
          </a>
          <div>
            <a href={result.page_url}>
              {result.title}
            </a>
          </div>
          <div>
            <i>
              &hellip; {result.snippet} &hellip;
            </i>
          </div>
        </div>
      </div>
    );
  }
}
