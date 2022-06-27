const Movie = (props) => {
  // On créé le composant Movie à l'aide du fonction
  return (
    <div>
      <figure>
        <img src={props.thumbnail}
             alt={props.title}/>
      </figure>
      <h2>{props.title}</h2>
      <p></p>
    </div>
);
}

export default Movie;
