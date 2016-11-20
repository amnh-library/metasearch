import React, {Component} from 'react'
import SearchForm from '../form/SearchForm'
import ResultsWrapper from '../results/ResultsWrapper.js'
import BiodiversityResults from '../results/BiodiversityResults.js'
import BiodiversityClient from '../client/BiodiversityClient.js'
import WikiResults from '../results/WikiResults.js'
import WikiClient from '../client/WikiClient.js'
import ArchivesResults from '../results/ArchivesResults.js'
import ArchivesClient from '../client/ArchivesClient.js'
import OmekaResults from '../results/OmekaResults.js'
import OmekaClient from '../client/OmekaClient.js'
import './Container.css'
import $ from 'jquery'
import SierraClient from '../client/SierraClient.js'
import SierraResults from '../results/SierraResults.js'
import Masonry from 'react-masonry-component'

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
  'omeka': OmekaClient,
};

const masonryOptions = {
  transitionDuration: 0,
};

export default class Container extends Component {
  constructor() {
    super();
    // data received from api calls goes here, initially empty
    this.state = {
      term: '',
      results: [],
      result_count: 0,
      result_groups: 1,
      selectedApis: {
        'biodiversity library': true,
        'wikipedia': true,
        'sierra': true,
        'archives': true,
        'omeka': true,
      }
    };
  }

  handleSearchSubmit = term => {
    let _this = this;

    this.downgradeResultColors();

    this.setState({term: term});

    let result_count = 0;
    let result_group = this.state.result_groups + 1;

    Object.keys(apis)
    .filter(api => this.state.selectedApis[api])
    .forEach((api_name, i) => {
      result_count += 1;
      apis[api_name].run(term).then((result) => {
        _this.setState({
          results: this.state.results.concat([{
            data: result,
            api: api_name,
            term: term,
            result_id: this.state.result_count + i,
            result_group: result_group,
          }])
        });
      });
    });

    this.setState({
      result_count: this.state.result_count + result_count,
      result_groups: result_group,
    });
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
          age={result.result_group % 5}
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
        return <SierraResults results={result.data} term={result.term}/>
      case 'archives':
        return <ArchivesResults results={result.data}/>
      case 'omeka':
        return <OmekaResults results={result.data}/>
      default:
        return null;
    }
  }

  handleInputChange(field, event) {
    let selectedApis = { ...this.state.selectedApis }
    let currentChecked = this.state.selectedApis[field.apiName]
    selectedApis[field.apiName] = !currentChecked
    this.setState({
      ...this.state,
      selectedApis
    })
  }

  render() {
    let apiResults = [];

    this.state.results.forEach(r => {
      apiResults.unshift(this.renderApiResultWrapper(r));
    });

    return (
      <div>
        <SearchForm handleSubmit={this.handleSearchSubmit}/>
        <div className="api-select">
          {
            Object.keys(apis).map((apiName, idx) => {
              return (
                <div key={idx}>
                  <label>{apiName.toUpperCase()}</label>
                  <input
                    name={apiName}
                    type="checkbox"
                    defaultChecked={this.state.selectedApis[apiName]}
                    onChange={this.handleInputChange.bind(this, {apiName})}/>
                </div>
              )
            })
          }
        </div>
        <Masonry id="container" options={masonryOptions}>
          {apiResults}
        </Masonry>
      </div>
    );
  }

  downgradeResultColors() {
    $('.prev-results').removeClass('prev-results').addClass('old-results');
    $('.latest-results').removeClass('latest-results').addClass('prev-results');
  }
}
