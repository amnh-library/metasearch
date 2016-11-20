import React from 'react';

export default class WikiResults extends React.Component {


  render() {
    let result = this.props.result || {};
    let image = result.image_url ? (
      <a href={result.page_url}>
        <img id="wiki-img" src={result.image_url} alt={result.title}/>
      </a>) : (
        <img id="wiki-img" src="https://www.wikipedia.org/portal/wikipedia.org/assets/img/Wikipedia-logo-v2@2x.png" />
      )

    return (
      <div>
        <div>
          {image}
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
