import React, {Component} from "react"
import './SearchForm.css'

export default class SearchForm extends Component {
  handleSubmit = event => {
    event.preventDefault();
    this.props.handleSubmit(this.state.value);
    this.setState({ value: "" })
  };

  handleChange = event => {
    this.setState({value: event.target.value});
  };

  constructor(props) {
    super(props);
    this.state = {value: ""};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <div className="input-container">
        <form onSubmit={this.handleSubmit}>
          <div className="submit">
            <input className="search-term-input"
                   value={this.state.value}
                   type="text"
                   name="search"
                   onChange={this.handleChange}
                   placeholder="Search Keywords, Topics, Titles, or Authors"/>
            <input type="submit" value="Submit" className="button"/>
          </div>
        </form>
      </div>
    );
  }
}
