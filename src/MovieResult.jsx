/*eslint react/prop-types: "off"*/

export function MovieResult({ movie, onSelectMovie }) {
  function selectMovie() {
    onSelectMovie(movie.imdbID);
  }
  return (
    <li onClick={selectMovie}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}
