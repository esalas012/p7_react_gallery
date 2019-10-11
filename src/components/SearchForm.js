import React, {Component} from 'react';

class SearchForm extends Component{
  state = {
    inputText: ''
  }

//updates state
  onInputChange = (event) => {
    return this.setState({inputText: event.target.value});
  }

/*
  calls the onSearch method passed to props. Uses the state.inputText as first argument and a random number as second argument.
  updates url on every request.
*/
  handleSubmit = (event ) => {
    event.preventDefault();
    this.props.onSearch(this.state.inputText, Math.ceil(Math.random() * 100));
    let path = `/search/${this.state.inputText}`;
    this.props.route.history.push(path);
    event.currentTarget.reset();

  }
/*
  Renders search bar.
  Calls handleSubmit when user clicks on search or hits enter.
  Call onInputChange when user types something on the search bar.
*/
  render(){
    return(
    <form className="search-form" onSubmit = {this.handleSubmit} >
      <input type="search" name="search" placeholder="Search" required onChange={this.onInputChange}/>
      <button type="submit" className="search-button">
        <svg fill="#fff" height="24" viewBox="0 0 23 23" width="24" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          <path d="M0 0h24v24H0z" fill="none"/>
        </svg>
      </button>
    </form>
  )};
}

export default SearchForm;
