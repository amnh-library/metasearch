import React, { Component } from 'react'
import SearchForm from './form/Form'
import './App.css'

class App extends Component {
  render() {
    const styles = {
      input: {
        padding: '3em'
      }
    }
    return (
      <div className="App">
        <div className="App-header">
          <h2>Metasearch</h2>
        </div>
        <SearchForm />
      </div>
    )
  }
}

export default App
