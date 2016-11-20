import React, { Component } from 'react'
import SearchForm from '../form/Form'
import BiodiversityClient from '../client/BiodiversityClient'
import { run as biodiversityRun } from '../client/BiodiversityClient'


/*
* Container component = stateful
* - has all the api calls as functions (imported from client components)
* - passes the function that does the search to the SearchForm
* - sets state based on API responses
* - passes state as props to children components for API
* - child components are stateless
*/


export default class Container extends Component {
  constructor() {
    super()
    // data received from api calls goes here, initially empty
    this.setState({
      term: '',
      results: {}
    })
  }

  handleSearchSubmit = term => {
    console.log('handleSearchSubmit too ' + term)
    this.setState({ term })
    // let _this = this
    // api functions called here, update state based on results (or error)
  }

  render() {
    const styles = {}
    console.log(this.handleSearchSubmit)
    return (
      <div>
        <SearchForm handleSubmit={this.handleSearchSubmit} />
        <BiodiversityResults term={this.state.value} results={this.state.results.biodiversity}/>
      </div>
    )
  }

}
