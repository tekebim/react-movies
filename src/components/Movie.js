const Movie = (props) => {
  // On créé le composant Movie à l'aide du fonction
  return (
    <div className={"movie-card"}>
      <figure className={"card__thumbnail"}>
        {props.thumbnail !== "N/A" &&
        <img src={props.thumbnail}
             alt={props.title}/>
        }

        {props.thumbnail === "N/A" &&
        <img src="movie-default.png"
             alt={props.title}/>
        }
      </figure>
      <h2>{props.title}</h2>
    </div>
  );
}

export default Movie;
