import {gql, useQuery} from "@apollo/client";
import Movie from "./Movie";

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

  console.log(data);

  return data.movies.map((movie) => {
    // console.log(movie);
    return <Movie
      key={movie.id}
      poster={movie.thumbnail}
      title={movie.title}
      plot={movie.plot}
    />
  })
}

export default GetMovies;
