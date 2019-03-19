//Search should work for partial matches as well. 

import React, { Component } from "react";
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
    return this.props.songs.find(song => {
      if (song.title.toLowerCase() === this.state.searchInput.toLowerCase()) {

        console.log(song, "the object with the movie");
        //passed down boolean logic
        this.props.switchDisplay(true);
        this.setState({
          searchResults: song
        });
      }
    });
  };


  displaySearchResult = () => {

    console.log(this.state.searchResults, "in the display result funct");
    return (
      <div>
      <p>{this.state.searchResults.title}</p>
      <img className="searchImage" src={this.state.searchResults.img_url} alt="" />
      {this.props.displayUsersComments(this.state.searchResults.id)}
      </div>
    )
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
    console.log(this.props.switchDisplay, "passed down props");
    return (
      <div className="allSongsSearchFormPage">
        {this.searchInput()}
        {this.displaySearchResult()}
      </div>
    );
  }
}

export default AllSongsSearchForm;
