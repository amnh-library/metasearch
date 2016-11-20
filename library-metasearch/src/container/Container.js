import React, { Component, PropTypes } from 'react'
import SearchForm from '../form/SearchForm'
import BiodiversityResults from '../results/BiodiversityResults.js'
import BiodiversityClient from '../client/BiodiversityClient.js'

/*
* Container component = stateful
* - has all the api calls as functions (imported from client components)
* - passes the function that does the search to the SearchForm
* - sets state based on API responses
* - passes state as props to children components for API
* - child components are stateless
*/

const apis = {
  biodiversity: {
    client: BiodiversityClient,
  }
};

export default class Container extends Component {
  constructor() {
    super();
    // data received from api calls goes here, initially empty
    this.state = {
      term: '',
      results: [],
    };
  }

  handleSearchSubmit = term => {
    console.log('handleSearchSubmit too ' + term);
    this.setState({ term });

    Object.keys(apis).forEach(api => {
      apis[api].client.run(term).then((result) => {
        this.setState({
          results: [{
            data: result,
            api: api,
            term: term,
          }]
        });
      });
    });
  }

  renderApiResult(result) {
    switch (result.api) {
      case 'biodiversity':
        return <BiodiversityResults term={result.term} key={result.api} results={result.data}/>
    }
  }

  render() {
    const styles = {};

    return (
      <div style={styles.container}>
        <SearchForm handleSubmit={this.handleSearchSubmit} />
        {this.state.results.map(this.renderApiResult)}
      </div>
    );
  }

}
