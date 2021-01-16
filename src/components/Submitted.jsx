const Submitted = (props) => {
  return (
    <div className={props.submit}>
      {props.nomList.map((movie, index) => (
        <div>
          {" "}
          <a
            target="_blank"
            rel="noreferrer"
            href={"https://www.imdb.com/title/" + movie.imdbID}>
            {movie.Title + " (" + movie.Year + ")"}
          </a>
        </div>
      ))}
      <button onClick={props.reset} className="btn btn-secondary">
        Reset
      </button>
    </div>
  );
};

export default Submitted;
