import React, { useEffect } from 'react'
import { Container, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { loadMovie, movieLoading, notFound, updateFavourite, updateWatchlist } from '../actions/movieDetails';
import MovieDetailsContainer from '../components/movieDetailsContainer';


export default function MovieDetails() {
    const {id} = useParams();
    const movie = useSelector(state => state.movieDetails);
    const {token} = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const toggleFavourite = async () => {
        let response = await fetch(`http://localhost:8000/api/movies/toggle-favourite/${id}`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
        response = await response.json();
        if(response.added){
            dispatch(updateFavourite(true));
        }
        else if(response.removed){
            dispatch(updateFavourite(false));
        }
    }

    const toggleWatchlist = async () => {
        let response = await fetch(`http://localhost:8000/api/watchlist/toggle-watchlist/${id}`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
        response = await response.json();
        if(response.added){
            dispatch(updateWatchlist(true));
        }
        else if(response.removed){
            dispatch(updateWatchlist(false));
        }
    }

    const fetchMovieDetails = async () => {
        let response = await fetch(`http://localhost:8000/api/movies/get-movie-details/${id}`,
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
        response = await response.json();
        if(response.error){
            dispatch(notFound());
        }
        else{
            dispatch(loadMovie({
                ...response.data[0],
                isFavourite: response.is_favourite,
                isInWatchlist: response.is_in_watchList,
                toggleFavourites: toggleFavourite,
                toggleWatchlist: toggleWatchlist,
            }))
        }
    }


    useEffect(() => {
        dispatch(movieLoading());
        fetchMovieDetails();
        // eslint-disable-next-line
    }, [])

    return (
        <Container fluid>
            {movie.isLoading?
                <div className='d-flex justify-content-center py-3 w-100'><Spinner animation='border' /></div>
                :
                movie.notFound?
                    <div>Movie not found!</div>
                :
                <MovieDetailsContainer />
            }
        </Container>
    )
}
