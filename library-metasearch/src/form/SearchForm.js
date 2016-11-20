import React, { Component } from "react"

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
    const styles = {
      inputContainer: {
        margin: "4em",
        display: "flex",
        flexDirection: "column"
      },
      input: {
        padding: ".3rem"
      },
      button: {
        margin: "1em",
        padding: "1em"
      }
    }
    return (
      <div style={styles.inputContainer} id="search-term-input">
        <form onSubmit={this.handleSubmit}>
          <div>
            <label style={styles.label}>
              Search for something:
            </label>
          </div>
          <input value={this.state.value} style={styles.input} type="text" name="search" onChange={this.handleChange} />
          <input type="submit" value="Submit" style={styles.button} />
        </form>
      </div>
    )
  }
}
