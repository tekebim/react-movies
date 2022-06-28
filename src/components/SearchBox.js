const SearchBox = (props) => {
  return (
    <div className={"movie-searchbox"}>
      Search a movie :
      <input
        className="form-control searchbox__input"
        value={props.value}
        onChange={(event) => props.setSearchValue(event.target.value)}
        placeholder='Type to search...'
      ></input>
    </div>
  );
};

export default SearchBox;
