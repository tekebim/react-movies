import logo from './logo.svg';
import './App.css';
import movies from './movies.json';
// On importe les données content les films, graphQL viendra remplacer ce système
import Movie from "./components/Movie";
import {useState} from "react";

function App() {

  const [title, setTitle] = useState("");

  // Le State (ou état) permet de stocker des données de manière locale (par rapport à un compostant). Exemple : les données stockées dans e state de App, ne peuvent pas être utilisées directement dans le composant Movie
  const listMovies = movies.map(movie => {
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

  return (
    <div className="App">
      <div className="movies-wrapper">
        {listMovies}
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
          <input type="text" id="plot"/>
        </div>
      </div>
    </div>
  );
}

export default App;
