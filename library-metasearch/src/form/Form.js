import React, { Component } from 'react'


export default class SearchForm extends Component {
  handleSubmit = event => {
    alert("~~~~ submitted ~~~~" + this.state.value)
    event.preventDefault()
  }

  handleChange = event => {
    this.setState({ value: event.target.value})
  }

  constructor(props) {
    super(props)
    this.state = { value: '' }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  render() {
    return (
      <div className="input-container" id="search-term-input">
          <form onSubmit={this.handleSubmit}>
            <label>
              Search for something:
            <input value={this.state.value} className="input" type="text" name="search" onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}
