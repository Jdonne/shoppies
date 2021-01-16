const Nom = (props) => {
  return (
    <div className="d-flex align-items-center m-2 ">
      <button
        className="btn btn-warning mr-2"
        onClick={props.removeBtn}
        title={props.title}
        id={props.index}>
        delete
      </button>
      <div>
        {" "}
        <a
          target="_blank"
          rel="noreferrer"
          href={"https://www.imdb.com/title/" + props.imdb}>
          {props.title + " (" + props.year + ")"}
        </a>
      </div>
    </div>
  );
};

export default Nom;
