import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import MovieComponent from "./components/MovieComponent";
import MovieInfoComponent from "./components/MovieInfoComponent";

export const API_KEY = "c5c365c7";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  background-color: black;
  align-items: center;
  color: white;
  padding: 10px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;

  @media (max-width: 425px) {
    display: block;
  }  
  
`;
const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const MovieImage = styled.img`
  width: 48px;
  height: 48px;
  margin: 15px;
  background-color:red;
`;

const SearchBox = styled.div`
  width: 500px;
  display: flex;
  padding: 18px;
  flex-direction: row;
  background-color: white;
  border-radius: 10px;

  // @media (max-width:320px){
  //   width: 260px;
  // }
  // @media (min-width:370px){
  //   width:320px;
  // }
  @media (max-width:426px){
    width:clamp(16.25rem, -2.8409rem + 95.4545vw, 22.8125rem);
  }
`;
const SearchIcon = styled.img`
  width: 30px;
  height: 100%;
`;

const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: 300;
  border: none;
  outline: none;
  margin-left: 15px;
`;

const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 38px;
  gap: 24px;
  justify-content: space-evenly;
`;

function App() {
  const [searchQuery, updateSearchQuery] = useState("");
  const [timeoutId, updateTimeoutId] = useState(null);
  const [movieList, updateMovieList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState(null);

  const fetchData = async (searchString) => {
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`
      );
      updateMovieList(response.data.Search || []);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const onTextChange = (event) => {
    clearTimeout(timeoutId);
    updateSearchQuery(event.target.value);

    const newTimeoutId = setTimeout(() => {
      if (event.target.value.trim()) {
        fetchData(event.target.value);
      }
    }, 500);
    updateTimeoutId(newTimeoutId);
  };

  return (
    <Container>
      <Header>
        <AppName>
          <MovieImage src="/images/popcorn.svg" alt="Logo" />Blubie Buff
        </AppName>
        <SearchBox>
          <SearchIcon src="/searchicon.svg" />
          <SearchInput
            placeholder="Search Genre..."
            value={searchQuery}
            onChange={onTextChange}
          />
        </SearchBox>
      </Header>
      {selectedMovie && (
        <MovieInfoComponent
          selectedMovie={selectedMovie}
          onMovieSelect={onMovieSelect}
        />
      )}
      <MovieListContainer>
        {movieList?.length ? (
          movieList.map((movie, index) => (
            <MovieComponent
              key={index}
              movie={movie}
              onMovieSelect={onMovieSelect}
            />
          ))
        ) : (
          <p>No Movies Found</p>
        )}
      </MovieListContainer>
    </Container>
  );
}

export default App;
