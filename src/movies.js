import requests from "./requests";

export const movieList = () => {
    return [
        { title: "Netflix Originals", url: requests.fetchNetflixOriginals },
        { title: "Trending Now", url: requests.fetchTrending },
        { title: "Top Rated", url: requests.fetchTopRated },
        { title: "Action Movies", url: requests.fetchActionMovies },
        { title: "Comedy Movies", url: requests.fetchComedyMovies },
        { title: "Horror Movies", url: requests.fetchHorrorMovies },
        { title: "Romance Movies", url: requests.fetchRomanceMovies },
        { title: "Documentaries", url: requests.fetchDocumantaries }
    ]
}