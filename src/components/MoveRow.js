import React, { useState, useEffect } from 'react';
import axios from '../axios';
import youtube from '../youtube'
import YouTube from 'react-youtube';
import '../css/Row.css';

const base_url = "https://image.tmdb.org/t/p/w600_and_h900_bestv2/";

const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
};

function MoveRow({ fetchUrl, isLargeRow, title }) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState('');
    const [activeRow, setActiveRow] = useState(0);

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);

            if (request.data.results.length) setMovies(request.data.results);

            return request;
        }

        fetchData();
    }, [fetchUrl])

    const handleClick = async (movie, index) => {
        if (trailerUrl && index === activeRow) {
            setTrailerUrl('')
            setActiveRow();
        } else {
            const response = await youtube.get('/search', {
                params: {
                    q: `${!movie.name ? movie.title : movie.name} trailer`
                }
            })

            if (response.data.items) {
                let trailer = response.data.items;

                setTrailerUrl(trailer[0].id.videoId);
                setActiveRow(index);
            } 
        }
    }
    
  return (
    <div className='row'>
        <h2>{title}</h2>

        <div className='row__posters'>
            {movies.length && movies.map((movie, index) => (
                <>
                    <img 
                        key={movie.id}
                        onClick={() => handleClick(movie, index)}
                        className={`row__poster row__posterLarge`}
                        src={`${base_url}${movie.poster_path}`} alt={movie.name} />
                </>
                
            ))}
        </div>

        {trailerUrl !== '' && (
            <YouTube videoId={trailerUrl} opts={opts} />
        )}
    </div>
  )
}

export default MoveRow