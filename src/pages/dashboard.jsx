import React, { useEffect } from 'react'
import { Container, Row, Spinner } from 'react-bootstrap';
import Search from '../components/search';
import MovieCard from '../components/movieCard';
import { useDispatch, useSelector } from 'react-redux';
import { loadMovies, moviesLoading } from '../store/movies/actions';
import { sendRequest } from '../wrappers/apiWrappers';


export default function Dashboard() {
    const dispatch = useDispatch();
    const {movies, isLoading} = useSelector(state => state.movies)
    const {token} = useSelector(state => state.auth)


    const fetchMovies = async () => {
        let response = await sendRequest(
            `movies/get-movies/30`,
            'get',
            token,
            );
        dispatch(loadMovies(response))
    }

    useEffect(() => {
        dispatch(moviesLoading());
        fetchMovies();
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <Container fluid>
                <Search />
                <Row className='justify-content-center mt-4'>
                    {isLoading?
                        <div className='d-flex justify-content-center py-3 w-100'><Spinner animation='border' /></div>
                        :
                        movies.map((movie, id) => <MovieCard key={id} {...movie} />)
                    }
                </Row>
            </Container>
        </>
    )
}
