/*eslint react/prop-types: "off"*/

import { MovieResult } from './MovieResult.jsx';

export function ResultsList({ movies, onSelectMovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <MovieResult
          key={movie.imdbID}
          movie={movie}
          onSelectMovie={onSelectMovie}
        />
      ))}
    </ul>
  );
}
