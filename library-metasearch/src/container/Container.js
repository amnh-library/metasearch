import React, {Component} from 'react'
import SearchForm from '../form/SearchForm'
import ResultsWrapper from '../results/ResultsWrapper.js'
import BiodiversityResults from '../results/BiodiversityResults.js'
import BiodiversityClient from '../client/BiodiversityClient.js'
import WikiResults from '../results/WikiResults.js'
import WikiClient from '../client/WikiClient.js'
import ArchivesResults from '../results/ArchivesResults.js'
import ArchivesClient from '../client/ArchivesClient.js'
import './Container.css'
import $ from 'jquery'
import SierraClient from '../client/SierraClient.js'
import SierraResults from '../results/SierraResults.js'

/**
 * Container component = stateful
 * - has all the api calls as functions (imported from client components)
 * - passes the function that does the search to the SearchForm
 * - sets state based on API responses
 * - passes state as props to children components for API
 * - child components are stateless
 */

// names of API clients are used for printed name in search results
const apis = {
  'biodiversity library': BiodiversityClient,
  'wikipedia': WikiClient,
  'sierra': SierraClient,
  'archives': ArchivesClient,
};

export default class Container extends Component {
  constructor() {
    super();
    // data received from api calls goes here, initially empty
    this.state = {
      term: '',
      results: [],
      result_count: 0,
    };
  }

  handleSearchSubmit = term => {
    let _this = this;

    this.setState({term: term});

    let result_count = 0;

    Object.keys(apis).forEach((api_name, i) => {
      result_count += 1;
      apis[api_name].run(term).then((result) => {
        _this.setState({
          results: this.state.results.concat([{
            data: result,
            api: api_name,
            term: term,
            result_id: this.state.result_count + i,
          }])
        });
      });
    });

    this.setState({result_count: this.state.result_count + result_count});
  };

  renderApiResultWrapper(result) {
    let onCloseResult = () => this.setState({
      results: this.state.results.filter((r) => r.result_id !== result.result_id)
    });

    if ($.isEmptyObject(result) || $.isEmptyObject(result.data)) {
      return null;
    } else {
      return (
        <ResultsWrapper
          key={result.result_id * Math.random()}
          term={result.term}
          api={result.api}
          onClose={onCloseResult}>{this.renderApiResult(result)}</ResultsWrapper>
      );
    }
  }

  renderApiResult(result) {
    switch (result.api) {
      case 'biodiversity library':
        return <BiodiversityResults result={result.data}/>
      case 'wikipedia':
        return <WikiResults result={result.data}/>
      case 'sierra':
        return <SierraResults results={result.data}/>
      case 'archives':
        return <ArchivesResults results={result.data}/>
      default:
        return null;
    }
  }

  render() {
    let apiResults = [];

    this.state.results.forEach(r => {
      apiResults.unshift(this.renderApiResultWrapper(r));
    });

    return (
      <div>
        <SearchForm handleSubmit={this.handleSearchSubmit}/>
        <div className="container">
          {apiResults}
        </div>
      </div>
    );
  }
}
