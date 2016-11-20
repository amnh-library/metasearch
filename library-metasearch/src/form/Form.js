import React, { Component } from "react"
import run from '../client/BiodiversityClient';
import BiodiversityResults from '../results/BiodiversityResults'
import run2 from '../client/WikiClient';
import WikiResults from '../results/WikiResults'


export default class SearchForm extends Component {
  handleSubmit = event => {
    event.preventDefault()

    let _this = this;

    run(
      this.state.value,
      function (data) {
        _this.setState({
          results: {
            biodiversity: data
          }
        });
      }
    );

    run2(
      this.state.value,
      function(data) {
        _this.setState({
          results: {
            wiki: data
          }
        });
      }
    );
  }

  handleChange = event => {
    this.setState({ value: event.target.value})
  }

  constructor(props) {
    super(props)
    this.state = {
      results: {
        biodiversity: {},
        wiki: {}
      },
      value: ""
    };
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
              Search for something
            </label>
          </div>
          <input value={this.state.value} style={styles.input} type="text" name="search" onChange={this.handleChange} />
          <input type="submit" value="Submit" style={styles.button} />
        </form>
        <BiodiversityResults term={this.state.value} results={this.state.results.biodiversity}/>
        <WikiResults term={this.state.value} results={this.state.results.wiki}/>
      </div>
    )
  }
}
