import { useEffect, useState } from "react";
import YouTube from "react-youtube";
import axios from "axios";
const API = "https://api.themoviedb.org/3";
const API_KEY = "2a4091836187f030db5373508d5255d5";
const IMAGE_PATH = "https://image.tmdb.org/t/p/original";

export function ContextMovieCard() {
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState({ title: "Loading Movies" });
  const [trailer, setTrailer] = useState(null);
  const [searchKey, setSearchKey] = useState("");
  const [playing, setPlaying] = useState(false);

  const fetchMovies = async (searchKey) => {
    const type = searchKey ? "search" : "discover";
    const {
      data: { results },
    } = await axios.get(`${API}/${type}/movie`, {
      params: {
        api_key: API_KEY,
        query: searchKey,
      },
    });
    setMovies(results);
    setMovie(results[0]);

    if (results.length) {
      await fetchMovie(results[0].id);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const searchMovies = (e) => {
    e.preventDefault();
    fetchMovies(searchKey);
  };

  const fetchMovie = async (id) => {
    const { data } = await axios.get(`${API}/movie/${id}`, {
      params: {
        api_key: API_KEY,
        append_to_response: "videos",
      },
    });

    if (data.videos && data.videos.results) {
      const trailer = data.videos.results.find(
        (vid) => vid.name === "Official Trailer"
      );
      setTrailer(trailer ? trailer : data.videos.results[0]);
    }
    setMovie(data);
  };

  const selectMovie = async (movie) => {
    fetchMovie(movie.id);
    setMovie(movie);
    window.scrollTo[(0, 0)];
  };

  return (
    <div>
      <div className="search">
        <h2 className="search-title">¿Que deseas ver?</h2>
        <form onSubmit={searchMovies}>
          <input
            type="text"
            placeholder="buscar"
            onChange={(e) => setSearchKey(e.target.value)}
          ></input>
          <button className="search-button">BUSCAR</button>
        </form>
      </div>

      <div>
        <main>
          {movie ? (
            <div
              className="viewtrailer"
              style={{
                backgroundImage: `url("${IMAGE_PATH}${movie.backdrop_path}")`,
              }}
            >
              {playing ? (
                <>
                  <YouTube
                    videoId={trailer.key}
                    className="reproductor container"
                    containerClassName={"youtube-container amru"}
                    opts={{
                      width: "100%",
                      height: "100%",
                      playerVars: {
                        autoplay: 1,
                        controls: 0,
                        cc_load_policy: 0,
                        fs: 0,
                        iv_load_policy: 0,
                        modestbranding: 0,
                        rel: 0,
                        showinfo: 0,
                      },
                    }}
                  />
                  <button onClick={() => setPlaying(false)} className="boton">
                    Cerrar
                  </button>
                </>
              ) : (
                <div className="container">
                  <div className="">
                    {trailer ? (
                      <button
                        className="boton"
                        onClick={() => setPlaying(true)}
                        type="button"
                      >
                        Ver Trailer
                      </button>
                    ) : (
                      "Sorry, no trailer available"
                    )}
                    <h1 className="text-white">{movie.title}</h1>
                    <p className="text-white">{movie.overview}</p>
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </main>
      </div>

      <div className="movie-container">
        {movies.map((movie) => {
          return (
            <div
              className="movie"
              key={movie.id}
              onClick={() => selectMovie(movie)}
            >
              <img
                src={`${IMAGE_PATH + movie.poster_path}`}
                alt=""
                height={300}
                width={200}
              />
              <h4 className="movie-title">{movie.title}</h4>
            </div>
          );
        })}
      </div>

      <footer>
        <h2 class="titulo-final">&copy; Sebastián Rastelli</h2>
      </footer>
    </div>
  );
}
