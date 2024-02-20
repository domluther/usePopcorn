/*eslint react/prop-types: "off"*/

export function WatchedMovie({ movie, onDeleteMovie, onSelectMovie }) {
  function selectMovie() {
    console.log(movie);
    onSelectMovie(movie.imdbID);
  }

  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
      <button
        className="btn-delete"
        onClick={() => onDeleteMovie(movie.imdbID)}
      >
        X
      </button>
      <button className="btn-edit" onClick={selectMovie}>
        ✏️
      </button>
    </li>
  );
}
