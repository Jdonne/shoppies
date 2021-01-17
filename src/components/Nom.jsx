const Nom = (props) => {
  return (
    <div className="d-flex align-items-center m-2 ">
      <button
        className="btn btn-secondary mr-2"
        onClick={props.removeBtn}
        title={props.title}
        id={props.index}>
        Remove
      </button>
      <div className="mx-2">
        {" "}
        <a
          target="_blank"
          rel="noreferrer"
          href={"https://www.imdb.com/title/" + props.imdb}
          className="nomLinks">
          {props.title + " (" + props.year + ")"}
        </a>
      </div>
    </div>
  );
};

export default Nom;
