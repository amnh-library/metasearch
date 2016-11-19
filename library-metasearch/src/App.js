import React, { Component } from 'react'
import SearchForm from './form/Form'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={require('./img/hack-the-stacks.png')} alt="Metasearch"/>
          <h2>~Metasearch~</h2>
        </div>
        <div>
          <SearchForm />
        </div>
      </div>
    )
  }
}

export default App
