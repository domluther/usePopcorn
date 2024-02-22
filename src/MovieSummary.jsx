/*eslint react/prop-types: "off"*/
/*eslint no-unused-vars: "warn"*/

import { useState, useEffect, useRef } from 'react';
import StarRating from './StarRating.jsx';
import { Loader } from './Loader.jsx';

const REACT_APP_OMDB_KEY = '646978e2';

export function MovieSummary({
  selectedId,
  onCloseMovie,
  onAddWatched,
  watched,
}) {
  const [selectedMovie, setSelectedMovie] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const isDuplicate = watched.some((m) => m.imdbID === selectedId);
  const [userRating, setUserRating] = useState(0);
  const watchedRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  const ratedCount = useRef(0);

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = selectedMovie;

  function handleAdd() {
    // Only add if they have a rating
    if (userRating === 0) return;
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      runtime: Number(runtime.split(' ').at(0)),
      imdbRating: Number(imdbRating),
      userRating,
    };

    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  useEffect(() => {
    if (userRating) ratedCount.current = ratedCount.current + 1;
    console.log(`Logged ${ratedCount.current} times`);
  }, [userRating]);

  useEffect(
    // Fetch the information needed for the summary when it is selected
    function () {
      const controller = new AbortController();
      async function getMovieSummary() {
        try {
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${REACT_APP_OMDB_KEY}&i=${selectedId}`,
            { signal: controller.signal }
          );

          // Dealing with errors
          if (!res.ok) throw new Error('Something went wrong searching');

          const data = await res.json();

          if (data.Response === 'False') throw new Error('Movie not found');
          setSelectedMovie(data);
        } catch (err) {
          console.error(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      // Moved into here otherwise UI seems unresponsive
      setIsLoading(true);
      const timer = setTimeout(() => getMovieSummary());

      return () => {
        // Cleanup - no need for the AbortController or the timeout.
        controller.abort();
        clearTimeout(timer);
      };
    },
    [selectedId]
  );

  useEffect(
    // Set title of window when movie summary is shown
    () => {
      if (!title) return;
      document.title = `Movie: ${title}`;
      // Returns clean up function - runs when movieSummary unmounts and 'undoes' the effect.
      return () => (document.title = 'usePopcorn');
    },
    [title]
  );

  useEffect(
    function () {
      function closeWithEscape(e) {
        if (e.code === 'Escape') {
          onCloseMovie();
        }
      }
      document.addEventListener('keydown', closeWithEscape);

      // Cleanup - remove the event listener after the instance has closed
      return () => document.removeEventListener('keydown', closeWithEscape);
    },
    [onCloseMovie]
  );

  return (
    <>
      <div className="details">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <header>
              <button className="btn-back" onClick={onCloseMovie}>
                &larr;
              </button>
              <img src={poster} alt={`Poster of $movie}`} />
              <div className="details-overview">
                <h2>{title}</h2>
                <p>
                  {released} &bull; {runtime}
                </p>
                <p>{genre}</p>
                <p>
                  <span>⭐️</span>
                  {imdbRating} IMDB rating
                </p>
              </div>
            </header>
            <section>
              <div className="rating">
                <StarRating
                  maxRating={10}
                  rating={userRating}
                  defaultRating={watchedRating}
                  onSetRating={setUserRating}
                />
                {/* Only show the add if they have given a rating */}
                {userRating > 0 && (
                  <button className="btn-add" onClick={handleAdd}>
                    {isDuplicate ? 'Update rating' : 'Add to watched'}
                  </button>
                )}
              </div>
              <p>
                <em>{plot}</em>
              </p>
              <p> Starring {actors}</p>
              <p> Directed by {director}</p>
            </section>
          </>
        )}
      </div>
    </>
  );
}
