import React from 'react';
import { useState } from 'react';
import { Row, Spinner } from 'react-bootstrap';
import { DebounceInput } from 'react-debounce-input';

import '../styles/search.css'
import SearchSuggestion from './searchSuggestion';

export default function Search() {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isNothingFound, setIsNothingFound] = useState(false);
    const [isSearching, setIsSearching] = useState(false);

    const handleSearch = async (e) => {
        setQuery(e.target.value);
        if (e.target.value) {
            setIsSearching(true);
            let response = await fetch(`http://localhost:8000/api/movies/search/${e.target.value}`,
                {
                    method: 'GET',
                    // headers: {
                    //     'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    // },
                });
            response = await response.json();
            setIsSearching(false);
            if(response.invalid_query){
                setIsNothingFound(true);
                setSuggestions([]);
            }
            else{
                setIsNothingFound(false);
                setSuggestions(response);
            }
        }
        else {
            setSuggestions([]);
            setIsNothingFound(false);
        }
    }

    return (
        <Row className='justify-content-center p-0 m-0'>
            <div className='search col-10 col-md-6'>
                <div>
                    <DebounceInput
                        minLength={0}
                        debounceTimeout={300}
                        onChange={handleSearch}
                        placeholder='Search'
                    />
                </div>
                {query && suggestions.length ?
                    <div className='suggestions'>
                        {isSearching && <div className='text-center py-3'><Spinner animation="grow" /></div>}
                        {
                            suggestions.map((movie, id) => (
                                <SearchSuggestion {...movie} key={id} />
                            ))
                        }
                    </div>
                    :
                    query && isNothingFound ?
                        <div className='suggestions'>
                            <div className='text-center py-3'>No movie found!</div>
                        </div>
                        :
                        query ?
                            <div className='suggestions'>
                                <div className='text-center py-3'><Spinner animation="grow" /></div>
                            </div>
                            :
                            null
                }
            </div>
        </Row>
    )
}
