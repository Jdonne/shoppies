import "./App.css";
import React, { useState, useEffect } from "react";
import Card from "./components/Card";
import Nom from "./components/Nom";
import Submitted from "./components/Submitted";
// function searchArr(nomArr, movieArr) {
//   for (var i = 0; i < movieArr.length; i++) {
//     for (let k = 0; k < nomArr.length; k++) {
//       if (nomArr[k].imdbID === movieArr[i]) {
//         let movieIndex = movie.findIndex((obj) => obj.Title == e.target.title);
//       }
//     }
//   }
// }

// function searchArr(nameKey, myArray) {
//   for (var i = 0; i < myArray.length; i++) {
//     if (myArray[i].Title === nameKey) {
//       return myArray[i];
//     }
//   }
// }

const App = () => {
  const [search, setSearch] = useState("");
  const [movies, setMovie] = useState([]);
  const [nomList, setNomList] = useState([]);
  const [over, setOver] = useState("notOver");
  const [submit, setSubmit] = useState("notSubbed");

  let nomTemp = nomList.slice();
  let searchVar = "";
  let movieData = { Response: "False", Search: [{ Title: "Enter Movie" }] };

  // search bar state change function
  const handleSearchChange = (e) => {
    searchVar = e.target.value;
    setSearch(searchVar);
    console.log();
  };

  const handleNomBtn = (e) => {
    if (nomList.length < 5) {
      nomTemp.push(movies[e.target.id]);
      setNomList(nomTemp);
    }
    // start off here, search for same title to remove? use useeffect?
  };

  const handleRemove = (e) => {
    console.log(e.target.title);
    let foundIndex = nomTemp.findIndex((obj) => obj.Title == e.target.title);
    console.log(foundIndex);
    nomTemp.splice(foundIndex, 1);
    // console.log(nomTemp.splice(e.target.id));
    setNomList(nomTemp);
    // setToggle("");
  };

  const handleSubmit = () => {
    setSubmit("submitted");
  };

  const handleReset = () => {
    setSearch("");
    setMovie([]);
    setNomList([]);
    setOver("notOver");
    setSubmit("notSubbed");
  };
  // fetches api on search state changes
  useEffect(() => {
    async function apiFetch() {
      try {
        const movieAPI = await fetch(
          "http://www.omdbapi.com/?apikey=2be7a6b9&s=" + search
        );
        movieData = await movieAPI.json();
        // console.log(weatherData);
        console.log(movieData);
        if (movieData.Response !== "False") {
          setMovie((state) => movieData.Search);
          console.log(movies);
        }
      } catch {
        console.log("error");
      }
    }
    if (search !== "") {
      apiFetch();
    }
  }, [search, nomList]);
  //
  useEffect(() => {
    for (var i = 0; i < movies.length; i++) {
      for (let k = 0; k < nomTemp.length; k++) {
        console.log(nomTemp, movies);
        if (nomTemp[k].imdbID === movies[i].imdbID) {
          console.log(nomTemp, movies);
          let movieIndex = movies.findIndex(
            (obj) => obj.imdbID == nomTemp[k].imdbID
          );
          console.log(movieIndex);
          let removed = movies.slice();
          removed.splice(movieIndex, 1);
          console.log(removed);
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
    <div>
      <input
        type="text"
        id="search"
        value={search}
        onChange={handleSearchChange}></input>
      <div>Enter Movie Title</div>

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
      <div className={over + " d-flex"}>
        <h3 className="m-2">You've chosen 5 Nominations</h3>{" "}
        <button className="btn btn-secondary m-2" onClick={handleReset}>
          Reset
        </button>
        <button className="btn btn-success m-2" onClick={handleSubmit}>
          Submit
        </button>
      </div>
      <Submitted
        nomList={nomList}
        submit={submit}
        reset={handleReset}
        className="m-2"
      />
      <div>
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
  );
};

export default App;
