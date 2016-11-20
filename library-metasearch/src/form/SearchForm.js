import React, { Component } from "react"
import './SearchForm.css'

export default class SearchForm extends Component {
  handleSubmit = event => {
    console.log('SEARCH FORM SUBMIT')
    event.preventDefault()
    this.props.handleSubmit(this.state.value)
  }

  handleChange = event => {
    this.setState({ value: event.target.value})
  }

  constructor(props) {
    super(props)
    this.state = { value: "" }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  render() {
    return (
      <div className="input-container">
        <form onSubmit={this.handleSubmit}>
          <div>
            <label className="label">
              Search for something:
            </label>
          </div>
          <div className="submit">
            <input className="search-term-input" value={this.state.value} type="text" name="search" onChange={this.handleChange} />
            <input type="submit" value="Submit" className="button" />
          </div>
        </form>
      </div>
    )
  }
}
