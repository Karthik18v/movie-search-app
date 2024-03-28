import { Component } from "react";

import "./App.css";

class App extends Component {
  state = {
    moviesList: [],
    searchInput: "jurassic",
  };

  componentDidMount() {
    this.getTheMoviesData();
  }

  getTheMoviesData = async () => {
    const { moviesList, searchInput } = this.state;
    console.log(moviesList, searchInput);

    const apiUrl = `https://api.themoviedb.org/3/search/movie?query=${searchInput}&api_key=ae463b0a02be1647b0a4314eb2796871`;
    const fetchedData = await fetch(apiUrl);
    const response = await fetchedData.json();
    const result = response.results;
    console.log(response);
    this.setState({ moviesList: result });
  };

  onChangeSearchInput = (event) => {
    this.setState({ searchInput: event.target.value });
  };

  onClickSearchButton = () => {
    this.getTheMoviesData();
  };

  render() {
    const { moviesList, searchInput } = this.state;
    console.log(searchInput);
    return (
      <div className="main-container">
        <div className="navbar-container">
          <h3 className="heading">MOVIE NAME</h3>
          <input
            className="search-item"
            type="search"
            placeholder="search"
            onChange={this.onChangeSearchInput}
          />
          <button className="search-button" onClick={this.onClickSearchButton}>
            Search!
          </button>
        </div>
        <ul className="movies-list">
          {moviesList.map((eachItem) => (
            <li key={eachItem.id}>
              <div className="movie-item">
                <img
                  className="moviePoster"
                  src={`https://image.tmdb.org/t/p/original/${eachItem.poster_path}`}
                  alt="movie"
                />
                <div className="movie-details">
                  <h3 className="title">{eachItem.title}</h3>
                  <p className="release-date">
                    RELEASE DATE:{eachItem.release_date}
                  </p>
                  <p className="rating">RATING: {eachItem.vote_average}</p>
                  <p>{eachItem.overview}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
