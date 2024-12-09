import React, { useState } from "react";
import axios from "axios";
import Search from "./components/Search";
import Detail from "./components/Detail";
import "./App.css";

function App() {
    const [state, setState] = useState({
        s: "sherlock",
        results: [],
        selected: {},
    });

    const apiurl =
        "https://api.themoviedb.org/3/search/movie?query=";

    const searchInput = (e) => {
        let s = e.target.value;

        setState((prevState) => {
            return { ...prevState, s: s };
        });
    };

    const search = (e) => {
        let config = {
          headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNmYzN2FiMWE5ODJhY2Q5ODBmMWIwYmIwN2ZkZmEwZiIsIm5iZiI6MTczMzcwOTA2Ni4wMDcsInN1YiI6IjY3NTY0ZDA5MWUxOTRlZDZiZjMzYzYyMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RKVFQAULFbBto0PxIMSBbNqqsflVK6-emb9Xjg_1EQs'
          }
        }
        if (e.key === "Enter") {
            axios(apiurl + state.s, config).then(
                ({ data }) => {
                    let results = data.Search;

                    console.log(results);

                    setState((prevState) => {
                        return {
                            ...prevState,
                            results: results,
                        };
                    });
                }
            );
        }
    };

    const openDetail = (id) => {
        axios(apiurl + "&i=" + id).then(({ data }) => {
            let result = data;

            setState((prevState) => {
                return { ...prevState, selected: result };
            });
        });
    };

    const closeDetail = () => {
        setState((prevState) => {
            return { ...prevState, selected: {} };
        });
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Movie Search</h1>
            </header>
            <main>
                <Search
                    searchInput={searchInput}
                    search={search}
                />

                <div className="container">
                    {state.results.map((e) => (
                        <div
                            className="item"
                            onClick={() =>
                                openDetail(e.imdbID)
                            }
                        >
                            <img
                                style={{ width: "200px" }}
                                src={e.Poster}
                            />
                            <h3 style={{ color: "white" }}>
                                {e.Title}
                            </h3>
                        </div>
                    ))}
                </div>

                {typeof state.selected.Title !=
                "undefined" ? (
                    <Detail
                        selected={state.selected}
                        closeDetail={closeDetail}
                    />
                ) : (
                    false
                )}
            </main>
        </div>
    );
}

export default App;