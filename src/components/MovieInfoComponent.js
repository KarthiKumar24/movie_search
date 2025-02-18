import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { API_KEY } from "../App";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px 30px;
  justify-content: center;
  border-bottom: 1px solid lightgray;

  @media (max-width:425px){
  display:flex;
  flex-direction:column;
  }
`;

const CoverImage = styled.img`
  height: 352px;
  object-fit: cover;
`;

const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;

const MovieName = styled.span`
  font-size: 22px;
  font-weight: 600;
  color: black;
  margin: 15px 0;
  white-space: nowrap;
  overflow: hidden;
  text-transform: capitalize;
  text-overflow: ellipsis;
`;

const MovieInfo = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: black;
  margin: 4px 0;
  overflow: hidden;
  text-transform: capitalize;
  text-overflow: ellipsis;
  & span {
    opacity: 0.5;
  }
`;

const Close = styled.span`
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  margin-left: 10px;

  @media (max-width:425px){
    position: absolute;
    right: 0;
    top: 170px;
    margin: 10px;
  }
`;

const MovieInfoComponent = (props) => {
  const [movieInfo, setMovieInfo] = useState(null);
  const { selectedMovie } = props;

  useEffect(() => {
    axios
      .get(`https://www.omdbapi.com/?i=${selectedMovie}&apikey=${API_KEY}`)
      .then((response) => setMovieInfo(response.data));
  }, [selectedMovie]);

  return (
    <Container>
      {movieInfo ? (
        <>
          <CoverImage src={movieInfo.Poster} alt={movieInfo.Title} />
          <InfoColumn>
            <MovieName>Movie: {movieInfo.Title}</MovieName>
            <MovieInfo>
              IMDB Rating: <span>{movieInfo.imdbRating}</span>
            </MovieInfo>
            <MovieInfo>
              Year: <span>{movieInfo.Year}</span>
            </MovieInfo>
            <MovieInfo>
              Language: <span>{movieInfo.Language}</span>
            </MovieInfo>
            <MovieInfo>
              Rated: <span>{movieInfo.Rated}</span>
            </MovieInfo>
            <MovieInfo>
              Released: <span>{movieInfo.Released}</span>
            </MovieInfo>
            <MovieInfo>
              Runtime: <span>{movieInfo.Runtime}</span>
            </MovieInfo>
            <MovieInfo>
              Genre: <span>{movieInfo.Genre}</span>
            </MovieInfo>
            <MovieInfo>
              Director: <span>{movieInfo.Director}</span>
            </MovieInfo>
            <MovieInfo>
              Actors: <span>{movieInfo.Actors}</span>
            </MovieInfo>
            <MovieInfo>
              Plot: <span>{movieInfo.Plot}</span>
            </MovieInfo>
          </InfoColumn>
          <Close onClick={() => props.onMovieSelect(null)}>X</Close>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </Container>
  );
};

export default MovieInfoComponent;
