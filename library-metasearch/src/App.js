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
          <img src={require('./img/hack-the-stacks.png')} />
          <h2>Welcome to React</h2>
        </div>
        <SearchForm />
      </div>
    )
  }
}

export default App
