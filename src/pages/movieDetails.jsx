import React, { useEffect } from 'react'
import { useState } from 'react';
import { Container, Spinner } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import MovieDetailsContainer from '../components/movieDetailsContainer';
import { sendRequest } from '../wrappers/apiWrappers';


export default function MovieDetails() {
    const {id} = useParams();
    const [movie, setMovie] = useState(null);
    const [isNotFound, setIsNotFound] = useState(false);
    const [updateCount, setUpdateCount] = useState(0);
    const {token} = useSelector(state => state.auth);

    const toggleFavourite = async () => {
        let response = await sendRequest(
            `movies/toggle-favourite/${id}`,
            'post',
            token,
            );
        if(response.added){
            setMovie({...movie, is_favourite: true});
            setUpdateCount(updateCount+1);
        }
        else if(response.removed){
            setMovie({...movie, is_favourite: false});
            setUpdateCount(updateCount+1);
        }
    }

    const toggleWatchlist = async () => {
        let response = await sendRequest(
            `watchlist/toggle-watchlist/${id}`,
            'post',
            token,
            );
        if(response.added){
            setMovie({...movie, is_in_watchList: true});
            setUpdateCount(updateCount+1);
        }
        else if(response.removed){
            setMovie({...movie, is_in_watchList: false});
            setUpdateCount(updateCount+1);
        }
    }

    const fetchMovieDetails = async () => {
        let response = await sendRequest(
            `movies/get-movie-details/${id}`,
            'get',
            token,
            );
        if(!response.error){
            setMovie(response);
        }
        else{
            setIsNotFound(true);
        }
    }


    useEffect(() => {
        fetchMovieDetails();
        // eslint-disable-next-line
    }, [updateCount])

    return (
        <Container fluid>
            {
                isNotFound?
                <div>Movie not found!</div>
                :
                movie?
                <MovieDetailsContainer
                    {...movie.data[0]}
                    {...movie}
                    toggleFavourite={toggleFavourite}
                    toggleWatchlist={toggleWatchlist}
                />
                :
                <div className='d-flex justify-content-center py-3 w-100'><Spinner animation='border' /></div>
            }
        </Container>
    )
}
