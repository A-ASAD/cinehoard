import React, { useEffect } from 'react'
import { Container, Row } from 'react-bootstrap';
import Search from '../components/search';
import MovieCard from '../components/movieCard';
import { useDispatch, useSelector } from 'react-redux';
import { loadMovies, moviesLoading } from '../actions/movies';


export default function Dashboard() {
    const dispatch = useDispatch();
    const {movies, isLoading} = useSelector(state => state.movies)


    const fetchMovies = async () => {
        let response = await fetch('http://localhost:8000/api/movies/get-movies/30',
            {
                method: 'GET',
                // headers: {
                //     'Authorization': `Bearer ${token}`,
                // },
            });
        response = await response.json();
        console.log(response);
        dispatch(loadMovies(response))
    }

    useEffect(() => {
        if (isLoading){
            dispatch(moviesLoading());
            fetchMovies();
        }
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <Container fluid>
                <Search />
                <Row className='justify-content-center mt-4'>
                    {!isLoading && movies.map((movie, id) => <MovieCard key={id} {...movie} />)}
                </Row>
            </Container>
        </>
    )
}
