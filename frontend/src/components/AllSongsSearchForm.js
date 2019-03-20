import React, { Component } from "react";
import DisplayUsersComments from './DisplayUsersComments.js'
import '../css/AllSongsSearchForm.css'

class AllSongsSearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: "",
      searchResults: "",
      switchDisplay: this.props.switchDisplay
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    return this.props.songs.filter(song => {
      if (song.title.toLowerCase() === this.state.searchInput.toLowerCase() || song.title.toLowerCase().includes(this.state.searchInput.toLowerCase())) {

        console.log(song, "the object with the movie");
        //passed down boolean logic
        this.props.switchDisplay(true);
        this.setState({
          searchResults: song,
          searchInput: ""
        });
      }
    });
  };

//tried to get search to be more dynamic, but doesnt go to the else statement
  displaySearchResult = () => {
// var size = Object.keys(myObj).length;
let size1 = Object.values(this.state.searchResults).length
// debugger
    // console.log(this.state.searchResults, "in the display result funct");
    if(size1 === 5){
    return (
      <div>
      <p>{this.state.searchResults.title}</p>
      <img className="searchImage" src={this.state.searchResults.img_url} alt="" />
      <DisplayUsersComments searchId={this.state.searchResults.id}/ >
      {this.props.displayUsersComments(this.state.searchResults.id)}
      </div>
    )
  } else {
    let searchResults = Object.values(this.state.searchResults)
    return searchResults.map(result => {
      debugger
      return(
          <div>
          <p>{result.title}</p>
          <img className="searchImage" src={result.img_url} alt="" />
          <DisplayUsersComments searchId={result.id}/ >
          {this.props.displayUsersComments(result.id)}
          </div>
      )
    })
  }

  };

  searchInput = () => {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          onChange={this.handleChange}
          name="searchInput"
          type="text"
          placeholder="Search By Title"
        />
        <button type="SUBMIT">Search</button>
      </form>
    );
  };

  render() {
    // console.log(this.props.switchDisplay, "passed down props");
    return (
      <div className="allSongsSearchFormPage">
        {this.searchInput()}
        {this.displaySearchResult()}
      </div>
    );
  }
}

export default AllSongsSearchForm;
