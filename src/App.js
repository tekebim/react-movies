import './App.css';
import movies from './movies.json';
// On importe les données content les films, graphQL viendra remplacer ce système
import Movie from "./components/Movie";
import {useEffect, useState} from "react";
import SearchBox from './components/SearchBox';

function App() {

  const [title, setTitle] = useState("");
  const [plot, setPlot] = useState("");
  const [listMoviesJson, setListMoviesJson] = useState(movies);
  const [listMoviesFound, setListMoviesFound] = useState('');
  const [searchValue, setSearchValue] = useState('');

  // Le State (ou état) permet de stocker des données de manière locale (par rapport à un compostant). Exemple : les données stockées dans e state de App, ne peuvent pas être utilisées directement dans le composant Movie
  const listMovies = listMoviesJson.map(movie => {
    return <Movie
      key={movie.id}
      thumbnail={movie.thumbnail}
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
      title: title,
      plot: plot
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
  }

  const getMovieRequest = async () => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=263d22d8`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      setListMoviesFound(responseJson.Search);
    }
  };

  useEffect(() => {
    getMovieRequest();
  }, [searchValue]);

  return (
    <div className="App">
      <div className="movies-wrapper">
        {listMovies}
      </div>
      <div className="form-search-movie">
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
        {listMoviesFound &&
        <>
          <h3>{listMoviesFound.length} movie(s) found</h3>
          <ul className="search-results">
            {listMoviesFound.map((item, index) => {
              return <li className={"result__item"}
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
          <input type="submit" value={"Valider"} onClick={() => handleAddMovie()}/>
        </div>
      </div>
    </div>
  );
}

export default App;
