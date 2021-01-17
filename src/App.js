import "./App.css";
import React, { useState, useEffect } from "react";
import Card from "./components/Card";
import Nom from "./components/Nom";
import Submitted from "./components/Submitted";

const App = () => {
  const [search, setSearch] = useState("");
  const [movies, setMovie] = useState([]);
  const [nomList, setNomList] = useState([]);
  const [over, setOver] = useState("notOver");
  const [submit, setSubmit] = useState("notSubbed");
  const [hideNom, setHideNom] = useState("notHidden");

  let nomTemp = nomList.slice();
  let searchVar = "";
  let movieData = { Response: "False", Search: [{ Title: "Enter Movie" }] };

  // search bar state change function
  const handleSearchChange = (e) => {
    searchVar = e.target.value;
    setSearch(searchVar);
    console.log();
  };
  // nomination button
  const handleNomBtn = (e) => {
    if (nomList.length < 5) {
      nomTemp.push(movies[e.target.id]);
      setNomList(nomTemp);
    }
  };
  // remove nomination from list
  const handleRemove = (e) => {
    let foundIndex = nomTemp.findIndex((obj) => obj.Title == e.target.title);
    nomTemp.splice(foundIndex, 1);
    setNomList(nomTemp);
  };

  // handle submit classes/states
  const handleSubmit = () => {
    setSubmit("submitted");
    setHideNom("hideNom");
  };

  // resets states to initial
  const handleReset = () => {
    setSearch("");
    setMovie([]);
    setNomList([]);
    setOver("notOver");
    setSubmit("notSubbed");
    setHideNom("notHidden");
  };
  // fetches api on search state changes and nomlist change (remove button)
  useEffect(() => {
    async function apiFetch() {
      try {
        const movieAPI = await fetch(
          "https://www.omdbapi.com/?apikey=2be7a6b9&s=" + search
        );
        movieData = await movieAPI.json();
        if (movieData.Response !== "False") {
          setMovie((state) => movieData.Search);
        }
      } catch {
        console.log("error");
      }
    }
    if (search !== "") {
      apiFetch();
    }
  }, [search, nomList]);
  // matches nom list with movie list to remove from selection on render
  useEffect(() => {
    for (var i = 0; i < movies.length; i++) {
      for (let k = 0; k < nomTemp.length; k++) {
        if (nomTemp[k].imdbID === movies[i].imdbID) {
          let movieIndex = movies.findIndex(
            (obj) => obj.imdbID == nomTemp[k].imdbID
          );
          let removed = movies.slice();
          removed.splice(movieIndex, 1);
          setMovie((state) => removed);
          return;
        }
      }
    }
    if (nomList.length === 5) {
      setOver("over");
    } else {
      setOver("notOver");
    }
  });

  return (
    <div className="d-flex flex-column align-items-center  mainApp  ">
      <h1 className="title my-2">The Shoppies</h1>
      <input
        placeholder="search"
        className="mt-1 form-control w-50"
        type="text"
        id="search"
        value={search}
        onChange={handleSearchChange}></input>
      <h5 className="mt-2 title ">Enter Movie Title</h5>

      <div className="row justify-content-center  nomArea  mt-4 mb-3">
        <div className="col-lg-5 border border-2 border-muted  rounded bg-dark mx-3  ">
          <h4 className="mx-2 mt-4 text-light">Movies:</h4>
          <div className="mb-4">
            {movies.map((movie, index) => (
              <Card
                nomBtn={handleNomBtn}
                key={index}
                index={index}
                title={movie.Title}
                year={movie.Year}
                imdb={movie.imdbID}
                // toggle={toggleBtn}
              />
            ))}
          </div>
        </div>

        <div
          className={
            hideNom +
            " col-lg-5 border border-2 rounded border-muted mx-3 nomSection   "
          }>
          <h4 className="mx-2 mt-4">Nominations:</h4>
          <div className="mb-4">
            <div className={over}>
              <h5 className="m-2 ">You've chosen 5 Nominations</h5>{" "}
              <div className="d-flex">
                <button
                  className="btn-sm btn btn-danger resetBtn m-2"
                  onClick={handleReset}>
                  Reset
                </button>
                <button
                  className="btn-sm btn btn-success m-2"
                  onClick={handleSubmit}>
                  Submit
                </button>
              </div>
            </div>
            {nomList.map((movie, index) => (
              <Nom
                key={index}
                removeBtn={handleRemove}
                index={index}
                title={movie.Title}
                year={movie.Year}
                imdb={movie.imdbID}
              />
            ))}
          </div>
        </div>
      </div>

      <Submitted nomList={nomList} submit={submit} reset={handleReset} />
    </div>
  );
};

export default App;
