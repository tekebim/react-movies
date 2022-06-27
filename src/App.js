import logo from './logo.svg';
import './App.css';
import movies from './movies.json';
// On importe les données content les films, graphQL viendra remplacer ce système
import Movie from "./components/Movie";

function App() {
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
      {listMovies}
    </div>
  );
}

export default App;
