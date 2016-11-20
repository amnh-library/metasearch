import React, { Component } from 'react'
import Container from './container/Container'
import './App.css'
import hackTheStacks from './img/hack-the-stacks.png'
import logo from './img/amnh-logo.png'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <div>
            <img className="App-header-logo" src={logo} alt="AMNH Logo" />
          </div>
          <h2 className="App-title">Library Metasearch</h2>
          <div>
            <img className="App-header-img" src={hackTheStacks} alt="Metasearch" />
          </div>
        </div>
        <div className="App-container">
          <Container />
        </div>
      </div>
    )
  }
}

export default App
