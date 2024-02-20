/*eslint react/prop-types: "off"*/

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export function WatchedSummary({ watched, setWatched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  // TODO: How do I  make this trigger a re-render of WatchedList?
  function sortBy(order) {
    const sortedWatched = watched.sort((a, b) => b[order] - a[order]);
    setWatched(sortedWatched);
  }

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p onClick={() => sortBy('imdbRating')}>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(1)}</span>
        </p>
        <p onClick={() => sortBy('userRating')}>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(1)}</span>
        </p>
        <p onClick={() => sortBy('runtime')}>
          <span>⏳</span>
          <span>{avgRuntime.toFixed(0)} min</span>
        </p>
      </div>
    </div>
  );
}
