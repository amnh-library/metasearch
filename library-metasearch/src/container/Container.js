import React, { Component, PropTypes } from 'react'
import SearchForm from '../form/SearchForm'
import ResultsWrapper from '../results/ResultsWrapper.js'
import BiodiversityResults from '../results/BiodiversityResults.js'
import BiodiversityClient from '../client/BiodiversityClient.js'
import WikiResults from '../results/WikiResults.js'
import WikiClient from '../client/WikiClient.js'

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

    var result_count = this.state.result_count
    Object.keys(apis).forEach(api => {
      apis[api].run(term).then((result) => {
        this.setState({
          results: this.state.results.concat([{
            data: result,
            api: api,
            term: term,
            result_id: result_count,
          }])
        });
      });
      result_count+=1;
    });

    this.setState({result_count: result_count});
  }

  renderApiResultWrapper(result) {
    let onCloseResult = () => this.setState({
      results: this.state.results.filter((r) => r.result_id != result.result_id)
    })
    return <ResultsWrapper
        key={result.api}
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
    const styles = {};

    var apiResults = [];
    this.state.results.forEach(r =>
        apiResults.unshift(this.renderApiResultWrapper(r)
    ))

    return (
      <div style={styles.container}>
        <SearchForm handleSubmit={this.handleSearchSubmit} />
        {apiResults}
      </div>
    );
  }

}
