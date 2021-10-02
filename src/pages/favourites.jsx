import React, { useState } from 'react'
import { useEffect } from 'react';
import { Container, Row, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import FavouriteItem from '../components/favouriteItem';

export default function Favourites() {

    const [favourites, setFavourites] = useState(null);
    const {token} = useSelector(state => state.auth);

    const fetchFavourites = async () => {
        let response = await fetch('http://localhost:8000/api/movies/get-favourites/',
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
        response = await response.json();
        if(!response.error)
            setFavourites(response);
    }

    const toggleFavourite = async (id) => {
        let response = await fetch(`http://localhost:8000/api/movies/toggle-favourite/${id}`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
        response = await response.json();
        if (!response.error)
            setFavourites(favourites.filter(movie => movie.id !== id))
    }

    useEffect(() => {
        fetchFavourites();
        // eslint-disable-next-line
    }, [favourites])

    return (
        <Container fluid>
            <Row className='mt-4 justify-content-center'>
                {favourites?
                    favourites.length?
                        favourites.map((movie, id) => (
                            <FavouriteItem key={id} {...movie} toggleFavourite={toggleFavourite}/>
                        ))
                        :
                        <div className='text-center'>No movies added yet!</div>
                        :
                        <div className='d-flex justify-content-center py-3 w-100'><Spinner animation='border' /></div>
                }
            </Row>
        </Container>
    )
}
