import React from 'react';
import { useState, useEffect } from 'react';
import { Form, Row, Spinner, Collapse } from 'react-bootstrap';
import { DebounceInput } from 'react-debounce-input';
import { useSelector } from 'react-redux';

import '../styles/search.css'
import SearchSuggestion from './searchSuggestion';
import { sendRequest } from '../wrappers/apiWrappers';

export default function Search() {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isNothingFound, setIsNothingFound] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);
    const {token} = useSelector(state => state.auth);
    const [genres, setGenres] = useState([]);

    const handleSearch = async (e) => {
        setQuery(e.target.value);
        if (e.target.value) {
            setIsSearching(true);
            let response = await sendRequest(
                `movies/search/${e.target.value}`,
                'get',
                token,
                );
            setIsSearching(false);
            if (response.invalid_query) {
                setIsNothingFound(true);
                setSuggestions([]);
            }
            else {
                setIsNothingFound(false);
                setSuggestions(response);
            }
        }
        else {
            setSuggestions([]);
            setIsNothingFound(false);
        }
    }

    const fetchGenres = async () => {
        let response = await sendRequest(
            `movies/get-genres/`,
            'get',
            token,
            );
        setGenres(response);
    }

    useEffect(() => {
        fetchGenres();
        //eslint-disable-next-line
    }, [])

    return (
        <Row className='justify-content-center p-0 m-0'>
            <div className='search col-10 col-md-8 col-lg-6 p-0'>
                <div className='d-flex align-items-center search-input'>
                    <DebounceInput
                        minLength={2}
                        debounceTimeout={300}
                        onChange={handleSearch}
                        placeholder='Search'
                    />
                    <div className='filters-button me-3' onClick={() => { setIsFiltersOpen(!isFiltersOpen) }}><i className="fas fa-sliders-h fa-lg"></i></div>
                </div>
                <div className='suggestions'>
                    <Collapse in={isFiltersOpen}>
                        <div>
                            <div className='filters'>
                                <div className='col-10 col-md-3'>
                                    <Form.Select >
                                        <option>Genre</option>
                                        {
                                            genres.map((genre, id)=>(
                                                <option key={id} value={genre.id}>{genre.name}</option>
                                            ))
                                        }
                                    </Form.Select>
                                </div>
                                <div className='col-10 col-md-3'>
                                    <Form.Select >
                                        <option value=''>Genre</option>
                                    </Form.Select>
                                </div>
                                <div className='col-10 col-md-3'>
                                    <Form.Select >
                                        <option value=''>Genre</option>
                                    </Form.Select>
                                </div>
                            </div>
                        </div>
                    </Collapse>
                    {query && suggestions.length ?
                        <div className='pt-2 border-top'>
                            {isSearching && <div className='text-center py-3'><Spinner animation="grow" /></div>}
                            {
                                suggestions.map((movie, id) => (
                                    <SearchSuggestion {...movie} key={id} />
                                ))
                            }
                        </div>
                        :
                        query && isNothingFound ?
                            <div className='pt-2 border-top'>
                                <div className='text-center py-3'>No movie found!</div>
                            </div>
                            :
                            query &&
                                <div className='pt-2 border-top'>
                                    <div className='text-center py-3'><Spinner animation="grow" /></div>
                                </div>
                    }
                </div>
            </div>
        </Row>
    )
}
