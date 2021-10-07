import React, { useState } from 'react'
import { useEffect } from 'react';
import { Container, Row, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import FavouriteItem from '../components/favouriteItem';
import { sendRequest } from '../wrappers/apiWrappers';

export default function Favourites() {

    const [favourites, setFavourites] = useState(null);
    const [updateCount, setUpdateCount] = useState(0);
    const {token} = useSelector(state => state.auth);

    const fetchFavourites = async () => {
        let response = await sendRequest(
            `movies/get-favourites/`,
            'get',
            token,
            );
        if(!response.error)
            setFavourites(response);
        else
            setFavourites([]);
    }

    const toggleFavourite = async (id) => {
        let response = await sendRequest(
            `movies/toggle-favourite/${id}`,
            'post',
            token,
            );
        if (!response.error){
            setFavourites(favourites.filter(movie => movie.id !== id));
            setUpdateCount(updateCount+1);
        }
    }

    useEffect(() => {
        fetchFavourites();
        // eslint-disable-next-line
    }, [updateCount])

    return (
        <Container fluid>
            <Row className='mt-4 justify-content-center'>
                <div className='heading mb-3'>
                    <div></div>
                    <h3 className='mx-3'>Favourites</h3>
                    <div></div>
                </div>
                {favourites?
                    favourites.length?
                        favourites.map((movie, id) => (
                            <FavouriteItem key={id} {...movie} toggleFavourite={toggleFavourite} />
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
