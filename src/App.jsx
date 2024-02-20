/*eslint no-unused-vars: "warn"*/
/*eslint react/prop-types: "off"*/

import { useEffect, useState } from 'react';
import StarRating from './StarRating.jsx';
import { WatchedList } from './WatchedList.jsx';
import { WatchedSummary } from './WatchedSummary.jsx';
import { ResultsList } from './ResultsList.jsx';
import { Box } from './Box.jsx';
import { Search } from './Search.jsx';
import { NavBar } from './NavBar.jsx';
import { NumResults } from './NumResults.jsx';
import { ErrorMessage } from './ErrorMessage.jsx';
import { MovieSummary } from './MovieSummary.jsx';
import { Loader } from './Loader.jsx';

export const omdbAPIkey = '646978e2';

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState(() => {
    const localValue = localStorage.getItem('watchedMovies');
    if (!localValue) return [];
    return JSON.parse(localValue);
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedId, setSelectedId] = useState(null);

  useEffect(
    () => localStorage.setItem('watchedMovies', JSON.stringify(watched)),
    [watched]
  );

  // Defined in here as needs states - otherwise would have to pass those in as props to Search
  async function handleSummaryLookup(query) {
    try {
      setError('');
      setIsLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${omdbAPIkey}&s=${query}`
      );

      // Dealing with errors
      if (!res.ok) throw new Error('Something went wrong searching');

      const data = await res.json();

      if (data.Response === 'False') throw new Error('Movie not found');
      setMovies(data.Search);
    } catch (err) {
      console.error(err.message);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSelectMovie(id) {
    // Ternary to clear id - means clicking on same movie closes summary
    setSelectedId((selectedId) => (id !== selectedId ? id : null));
  }

  function handleDeleteWatched(id) {
    setWatched(watched.filter((m) => m.imdbID !== id));
  }

  function handleCloseMovieSummary() {
    setSelectedId(null);
    document.title = 'usePopcorn';
  }

  function handleAddWatched(movie) {
    const duplicate = watched.some((m) => m.imdbID === selectedId);

    // If it is already in the list, update the rating
    if (duplicate) {
      const tempWatched = [
        ...watched.filter((m) => m.imdbID !== selectedId),
        movie,
      ];
      setWatched(tempWatched);
    } else {
      setWatched((watched) => [...watched, movie]);
    }
  }

  return (
    <>
      <NavBar>
        <Search onSearch={handleSummaryLookup} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {error && <ErrorMessage message={error} />}
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <ResultsList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
        </Box>
        <Box>
          {selectedId ? (
            <MovieSummary
              selectedId={selectedId}
              onCloseMovie={handleCloseMovieSummary}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} setWatched={setWatched} />
              <WatchedList
                watched={watched}
                onDeleteMovie={handleDeleteWatched}
                onSelectMovie={handleSelectMovie}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}
