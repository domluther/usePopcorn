/*eslint react/prop-types: "off"*/
/*eslint no-unused-vars: "warn"*/

import { useState } from 'react';

export function Search({ onSearch }) {
  const [query, setQuery] = useState('');

  function onSubmit(e) {
    e.preventDefault();
    setQuery('');
    onSearch(query);
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {/* <span>
        <button className="search-btn">🔍</button>
      </span> */}
    </form>
  );
}
