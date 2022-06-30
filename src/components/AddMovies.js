import {gql, useMutation} from "@apollo/client";
import {useState} from "react";

const AddMovies = () => {
  const [showAddMovieForm, setShowAddMovieForm] = useState(false);
  const [title, setTitle] = useState("");
  const [plot, setPlot] = useState("");
  const [poster, setPoster] = useState("");
  const ADD_MOVIE = gql`
      mutation addMovie($movie: MovieInput) {
          createMovie(movie: $movie){
              title,
              plot
          }
      }
  `;

  // On utilise une variable dans la mutation pour pouvoir recueillir des données dynamiques.
  const [addMovie, {loading, data, error}] = useMutation(ADD_MOVIE);
  // addMovie nous permettra d'envoyer les données àç la variable de la requête

  if (loading) return <p>Chargement...</p>;
  if (error) return `Error! ${error.message}`;

  const AddFormMovie = () => {
    return <div className="form-add-movie">
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
        <label htmlFor="poster">Poster URL </label>
        <input type="text" id="poster" onChange={(e) => {
          setPoster(e.target.value);
        }}/>
      </div>
      <div className="form-input">
        <input type="submit" value={"Valider"}
               onClick={() => addMovie({variables: {movie: {title: title, plot: plot}}})}/>
        <button onClick={() => handleCTAClick()}>Close</button>
      </div>
    </div>
  }

  const handleCTAClick = () => {
    setShowAddMovieForm(!showAddMovieForm);
  }

  const AddCTAMovie = () => {
    return <div className={"add-movie-wrapper"}>
      <button onClick={() => handleCTAClick()}>Add a movie</button>
    </div>
  }

  return (
    <>
      {!showAddMovieForm ?
        <AddCTAMovie/> :
        <AddFormMovie/>
      }
    </>
  );
}

export default AddMovies;
