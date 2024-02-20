/*eslint react/prop-types: "off"*/
/*eslint no-unused-vars: "warn"*/

import { useState, useEffect } from 'react';
import { omdbAPIkey } from './App.jsx';
import StarRating from './StarRating.jsx';
import { Loader } from './Loader.jsx';

// {
//   "Title": "Kung Fu Panda",
//   "Year": "2008",
//   "Rated": "PG",
//   "Released": "06 Jun 2008",
//   "Runtime": "92 min",
//   "Genre": "Animation, Action, Adventure",
//   "Director": "Mark Osborne, John Stevenson",
//   "Writer": "Jonathan Aibel, Glenn Berger, Ethan Reiff",
//   "Actors": "Jack Black, Ian McShane, Angelina Jolie",
//   "Plot": "To everyone's surprise, including his own, Po, an overweight, clumsy panda, is chosen as protector of the Valley of Peace. His suitability will soon be tested as the valley's arch-enemy is on his way.",
//   "Language": "English, Russian",
//   "Country": "United States, United Kingdom",
//   "Awards": "Nominated for 1 Oscar. 15 wins & 39 nominations total",
//   "Poster": "https://m.media-amazon.com/images/M/MV5BODJkZTZhMWItMDI3Yy00ZWZlLTk4NjQtOTI1ZjU5NjBjZTVjXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg",
//   "Ratings": [
//       {
//           "Source": "Internet Movie Database",
//           "Value": "7.6/10"
//       },
//       {
//           "Source": "Rotten Tomatoes",
//           "Value": "87%"
//       },
//       {
//           "Source": "Metacritic",
//           "Value": "74/100"
//       }
//   ],
//   "Metascore": "74",
//   "imdbRating": "7.6",
//   "imdbVotes": "511,413",
//   "imdbID": "tt0441773",
//   "Type": "movie",
//   "DVD": "25 Nov 2015",
//   "BoxOffice": "$215,771,591",
//   "Production": "N/A",
//   "Website": "N/A",
//   "Response": "True"
// }
export function MovieSummary({
  selectedId,
  onCloseMovie,
  onAddWatched,
  watched,
}) {
  const [selectedMovie, setSelectedMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const isDuplicate = watched.some((m) => m.imdbID === selectedId);
  const [userRating, setUserRating] = useState(0);
  const watchedRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

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
      runtime: runtime.split(' ').at(0),
      imdbRating: Number(imdbRating),
      userRating,
    };

    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  useEffect(
    function () {
      async function getMovieSummary() {
        try {
          setIsLoading(true);
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${omdbAPIkey}&i=${selectedId}`
          );

          // Dealing with errors
          if (!res.ok) throw new Error('Something went wrong searching');

          const data = await res.json();

          if (data.Response === 'False') throw new Error('Movie not found');
          setSelectedMovie(data);
          console.log(data);
        } catch (err) {
          console.error(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      getMovieSummary();
    },
    [selectedId]
  );

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie: ${title}`;
    },
    [title]
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
