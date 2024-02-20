/*eslint react/prop-types: "off"*/

import { WatchedMovie } from './WatchedMovie.jsx';

export function WatchedList({ watched, onDeleteMovie, onSelectMovie }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          key={movie.imdbID}
          movie={movie}
          onDeleteMovie={onDeleteMovie}
          onSelectMovie={onSelectMovie}
        />
      ))}
    </ul>
  );
}
