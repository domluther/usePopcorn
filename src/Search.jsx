/*eslint react/prop-types: "off"*/
/*eslint no-unused-vars: "warn"*/

import { useState, useRef, useEffect } from 'react';

export function Search({ onSearch }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  function onSubmit(e) {
    e.preventDefault();
    setQuery('');
    onSearch(query);
  }

  // useEffect(() => {
  //   // inputRef.current refers to the <input/> element,
  //   inputRef.current.focus();
  // }, []);

  useEffect(() => {
    function handleEnter(e) {
      if (document.activeElement === inputRef.current) return;
      if (e.code === 'AltRight') {
        inputRef.current.focus();
        setQuery('');
      }
    }
    document.addEventListener('keydown', handleEnter);

    return () => document.removeEventListener('keydown', handleEnter);
  }, []);

  return (
    <form onSubmit={onSubmit}>
      <input
        className="search"
        type="text"
        placeholder="Search films..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={inputRef}
        autoFocus
      />
    </form>
  );
}
