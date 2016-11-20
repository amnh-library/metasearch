import React, { Component } from 'react'
import Container from './container/Container'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img className="App-header-img" src={require('./img/hack-the-stacks.png')} alt="Metasearch" />
          <h2 className="App-title">Library Metasearch</h2>
          <h2 className="App-title">🕵 📖</h2>
        </div>
        <div>
          <Container />
        </div>
      </div>
    )
  }
}

export default App
