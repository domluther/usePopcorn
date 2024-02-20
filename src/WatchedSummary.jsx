/*eslint react/prop-types: "off"*/

import { useState } from 'react';

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export function WatchedSummary({ watched, setWatched }) {
  const [ascOrder, setAscOrder] = useState(false);
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  function toggleOrder() {
    setAscOrder((o) => !o);
  }

  // TODO: How do I  make this trigger a re-render of WatchedList?
  function sortBy(order) {
    if (ascOrder) {
      setWatched(watched.toSorted((a, b) => a[order] - b[order]));
    } else {
      setWatched(watched.toSorted((a, b) => b[order] - a[order]));
    }
  }

  return (
    <div className="summary">
      <h2>Films you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} films</span>
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
        <p onClick={toggleOrder}>{ascOrder ? '⬆' : '⬇'}</p>
      </div>
    </div>
  );
}
