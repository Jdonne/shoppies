import React, { useState } from "react";

const Card = (props) => {
  return (
    <div className="d-flex m-2 align-items-center">
      <button
        key={props.key}
        id={props.index}
        onClick={props.nomBtn}
        title={props.title}
        // onDoubleClick={handleToggle}
        className={" btn btn-warning mr-2"}>
        Nominate
      </button>
      <div className="mx-2">
        <a
          target="_blank"
          rel="noreferrer"
          href={"https://www.imdb.com/title/" + props.imdb}
          className="link-info">
          {props.title + " (" + props.year + ")"}
        </a>
      </div>
    </div>
  );
};
export default Card;
