import React, { Component, PropTypes } from 'react'
import SearchForm from '../form/SearchForm'
import ResultsWrapper from '../results/ResultsWrapper.js'
import BiodiversityResults from '../results/BiodiversityResults.js'
import BiodiversityClient from '../client/BiodiversityClient.js'
import WikiResults from '../results/WikiResults.js'
import WikiClient from '../client/WikiClient.js'
import './Container.css'

/*
* Container component = stateful
* - has all the api calls as functions (imported from client components)
* - passes the function that does the search to the SearchForm
* - sets state based on API responses
* - passes state as props to children components for API
* - child components are stateless
*/

const apis = {
  biodiversity: BiodiversityClient,
  wiki: WikiClient,
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
    console.log('handleSearchSubmit too ' + term);
    this.setState({ term });

    let result_count = 0
    Object.keys(apis).forEach((api, i) => {
      result_count+=1;
      apis[api].run(term).then((result) => {
        this.setState({
          results: this.state.results.concat([{
            data: result,
            api: api,
            term: term,
            result_id: this.state.result_count + i,
          }])
        });
      });
    });

    this.setState({result_count: this.state.result_count + result_count});
  }

  renderApiResultWrapper(result) {
    let onCloseResult = () => this.setState({
      results: this.state.results.filter((r) => r.result_id != result.result_id)
    })
    return <ResultsWrapper
        key={result.result_id}
        onClose={onCloseResult}>{this.renderApiResult(result)}</ResultsWrapper>
  }

  renderApiResult(result) {
    switch (result.api) {
      case 'biodiversity':
        return <BiodiversityResults term={result.term} results={result.data}/>
      case 'wiki':
        return <WikiResults term={result.term} results={result.data}/>
    }
  }

  render() {
    var apiResults = [];
    this.state.results.forEach(r =>
      apiResults.unshift(this.renderApiResultWrapper(r)
    ))

    return (
      <div>
        <SearchForm handleSubmit={this.handleSearchSubmit} />
        <div className="container">
          {apiResults}
        </div>
      </div>
    );
  }

}
