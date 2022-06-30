import './App.css';
import movies from './movies.json';
// On importe les données content les films, graphQL viendra remplacer ce système
import Movie from "./components/Movie";
import {useEffect, useState} from "react";
import SearchBox from './components/SearchBox';
import {useQuery, gql, useMutation} from "@apollo/client";

// useQuery est un hook qui permet de gérer les requêtes Query.

function App() {

  const [title, setTitle] = useState("");
  const [plot, setPlot] = useState("");
  const [poster, setPoster] = useState("");
  const [listMoviesJson, setListMoviesJson] = useState(movies);
  const [listMoviesFound, setListMoviesFound] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const GetMovies = () => {
    // getMovies sera un composant affichant tous les films

    // Première étape, on créé la requête.
    const GET_MOVIES = gql`
        query Movies {
            movies {
                title,
                plot
            }
        }
    `

    const {loading, error, data} = useQuery(GET_MOVIES);
    // data: pour la gestion des données.
    // loading: pour les différents états de la requête.
    // error: pour la gestion des erreurs.
    // useQuery: gère ces trois éléments.

    if (loading) return <p>Chargement...</p>;
    if (error) return `Error! ${error.message}`;

    return data.movies.map((movie) => {
      return <Movie
        key={movie.id}
        poster={movie.thumbnail}
        title={movie.title}
        plot={movie.plot}
      />
    })
  }

  const AddMovie = () => {
    const ADD_MOVIE = gql`
        mutation addMovie($movie: MovieInput) {
            createMovie(movie: $movie){
                title,
                plot
            }
        }
    `

    const [addMovie, {loading, data, error}] = useMutation(ADD_MOVIE);
  }

  // Le State (ou état) permet de stocker des données de manière locale (par rapport à un compostant). Exemple : les données stockées dans e state de App, ne peuvent pas être utilisées directement dans le composant Movie
  const listMovies = listMoviesJson.map(movie => {
    return <Movie
      key={movie.id}
      poster={movie.thumbnail}
      title={movie.title}
      plot={movie.plot}
    />
  });
  // Props : permet de faire passer des données d'un composant parent à un composant enfant.
  // Nom de props que l'on ne peut pas utiliser : key, className...
  // key permet de rendre unique chaque utilisation du composant Movie

  // le JSX est une extension syntaxique du Javascript
  const handleAddMovie = () => {
    let movie = {
      id: listMoviesJson.length + 1,
      title,
      plot,
      poster
    }

    setListMoviesJson([...listMoviesJson, movie]);
  }

  const handleMovieToList = (index) => {
    let item = {
      id: listMoviesFound[index]["imdbID"],
      thumbnail: listMoviesFound[index]["Poster"],
      title: listMoviesFound[index]["Title"],
      plot: listMoviesFound[index]["Title"]
    }

    setListMoviesJson([...listMoviesJson, item]);
    setListMoviesFound('');
  }

  const getMovieRequest = async () => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=263d22d8`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      setListMoviesFound(responseJson.Search);
    }
  };

  /*
  Les composants ont un cycle de vie (trois phases : mounting, updating, unmouting).
  Par défaut lorsque l'on modifie le state, le composant est mis à jour et il est re-rendu (le code s'exécute à nouveau).
  Cela peur poser des problèmes : il peut arriver que l'on veuille exécuter une portion de code du composant qu'une seule fois.
  On peut ajouter un second paramètre (un array), s'il est vide, useEffect ne se déclenchera quand phase mounting.
  Si on remplit le tableau avec des constantes du state, useEffect en cas de mise à jour ne s'exéctuera qu'en cas de mise à jour.
   */

  useEffect(() => {
    getMovieRequest();
  }, [searchValue]);

  return (
    <div className="site-container">
      <main className="site-main">
        <div className="form-search-movie">
          <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
          {listMoviesFound &&
          <>
            <h3>{listMoviesFound.length} movie(s) found</h3>
            <ul className="search-results">
              {listMoviesFound.map((item, index) => {
                return <li className={"result__item"} key={index}
                           onClick={() => handleMovieToList(index)}>{item.Title} ({item.Year})</li>
              })}
            </ul>
          </>
          }
        </div>
        <div className="form-add-movie">
          <div className="form-input">
            <label htmlFor="title">Titre du film</label>
            <input type="text" id="title" onChange={(e) => {
              setTitle(e.target.value);
            }}/>
          </div>
          <div className="form-input">
            <label htmlFor="plot">Synopsis du film</label>
            <input type="text" id="plot" onChange={(e) => {
              setPlot(e.target.value);
            }}/>
          </div>
          <div className="form-input">
            <label htmlFor="poster">Poster</label>
            <input type="text" id="poster" onChange={(e) => {
              setPoster(e.target.value);
            }}/>
          </div>
          <div className="form-input">
            <input type="submit" value={"Valider"} onClick={() => handleAddMovie()}/>
          </div>
        </div>
        <div className="movies-wrapper">
          {listMovies}
          <GetMovies/>
        </div>
      </main>
    </div>
  );
}

export default App;
