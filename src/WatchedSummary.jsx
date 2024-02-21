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

  function sortBy(order) {
    // Needs to give a new array not mutate in place to trigger re-render
    if (ascOrder) {
      setWatched(watched.toSorted((a, b) => (a[order] < b[order] ? -1 : 1)));
    } else {
      setWatched(watched.toSorted((a, b) => (a[order] < b[order] ? 1 : -1)));
    }
  }

  return (
    <div className="summary">
      <h2>Films you watched</h2>
      <div>
        <p onClick={() => sortBy('title')}>
          <span>🎬</span>
          <span>{watched.length}</span>
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
