import { useState } from "react";
import axios from "axios";
import Search from "./components/Search";
import "./App.css";
import MovieCard from "./components/MovieCard";
import {apiUrl, config} from "./constants";
import { Pagination } from "@mui/material";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
    const [state, setState] = useState({
        s: "sherlock",
        totalPages: 1,
        currentPage: 1,
        totalResults: 0,
        results: [],
    });

    const [dataPage, setDataPage] = useState(0);


    const searchInput = (e) => {
        let s = e.target.value;

        setState((prevState) => {
            return { ...prevState, s: s };
        });
    };
    const onDataPageChange = (event, page) => {
        if (state.currentPage >= 1) {
            axios(apiUrl + '/search/movie?query=' + state.s + '&page=' + page, config).then(
                ({ data }) => {
                    setDataPage(page - 1);
                    setState((prevState) => {
                        return {
                            ...prevState,
                            results: data.results,
                            currentPage: page,
                        };
                    });
                }
            );
        }
    }

    const search = (e) => {
        if (e.key === "Enter") {
            axios(apiUrl + '/search/movie?query=' + state.s, config).then(
                ({ data }) => {
                    let results = data.results;
                    setState((prevState) => {
                        return {
                            ...prevState,
                            results: results,
                            totalPages: data.total_pages,
                            currentPage: data.page,
                            nextPage: data.page === data.total_pages ? data.page : data.page+1,
                            totalResults: data.total_results,
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
                    {state.totalPages > 1 ? (
                        <Pagination
                            color="primary"
                            count={state.totalPages}
                            onChange={onDataPageChange}
                            page={dataPage + 1}
                            variant="outlined" 
                            shape="rounded"
                        />
                    ) : (
                        <div />
                    )}
                </div>
                <br />
                <div className="container">
                    {state.results.map((movie) => (
                       <MovieCard  
                            key={movie.id}
                            movie={movie} 
                            state={state}
                        />
                    ))}
                </div>

                <div className="container">
                    {state.totalPages > 1 ? (
                        <Pagination
                            color="primary"
                            count={state.totalPages}
                            onChange={onDataPageChange}
                            page={dataPage + 1}
                            variant="outlined" 
                            shape="rounded"
                        />
               
                    ) : (
                        <div />
                    )}
                </div>
                <div className="container">
                    {state.totalResults > 0 ? (
                        <div>Total Results: {state.totalResults}</div>
                    ) : (
                        <div />
                    )}
                </div>
            </main>
        </div>
    );
}

export default App;