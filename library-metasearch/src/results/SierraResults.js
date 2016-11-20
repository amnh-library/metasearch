import React from 'react';

export default class SierraResults extends React.Component {
  render() {

    let search_url = `http://libcat1.amnh.org/search~/a?searchtype=t&searcharg=${this.props.term}`
    let entries = [];
    this.props.results.entries.forEach(e => {
      entries.push(<div key={e.id} className="book">
        {e.title}
        <p className="author">{e.author}</p>
      </div>);
    });

    return (
      <div className="sierra">
        <div>
          {entries}
        </div>
        <div>
          <a href={search_url} target="blank">
            See more
          </a>
        </div>
      </div>
    );
  }
}
