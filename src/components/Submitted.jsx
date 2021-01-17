const Submitted = (props) => {
  return (
    <div className={props.submit + " border-2 border  rounded border-dark"}>
      <h1 className="text-warning">Here Are Your Nominees:</h1>
      {props.nomList.map((movie, index) => (
        <div className="m-2">
          {" "}
          <a
            target="_blank"
            rel="noreferrer"
            href={"https://www.imdb.com/title/" + movie.imdbID}
            className="link-danger h5 ">
            {movie.Title + " (" + movie.Year + ")"}
          </a>
        </div>
      ))}
      <button onClick={props.reset} className="btn btn-danger mt-3 mx-2">
        Reset
      </button>
    </div>
  );
};

export default Submitted;
