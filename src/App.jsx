import { useState } from "react";
import axios from "axios";
import Search from "./components/Search";
import "./App.css";
import MovieCard from "./components/MovieCard";
import {apiUrl, config} from "./constants";

function App() {
    const [state, setState] = useState({
        s: "sherlock",
        results: [],
        selected: {},
    });

    const searchInput = (e) => {
        let s = e.target.value;

        setState((prevState) => {
            return { ...prevState, s: s };
        });
    };

    const search = (e) => {
        if (e.key === "Enter") {
            axios(apiUrl + '/search/movie?query=' + state.s, config).then(
                ({ data }) => {
                    let results = data.results;
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
                    {state.results.map((movie) => (
                       <MovieCard  
                            key={movie.id}
                            movie={movie} 
                            state={state}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
}

export default App;