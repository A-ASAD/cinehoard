import React from 'react'
import { useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { userLogout } from '../actions/auth';

import '../styles/header.css'

export default function Header() {

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const history = useHistory();
    const [showMenu, setShowMenu] = useState(false);

    const handleLogout = ()=> {
        dispatch(userLogout());
        history.push('/login');
    }

    return (
        <Navbar collapseOnSelect expand="md" bg='dark' variant="dark" className='px-1'>
            <Container>
                <Navbar.Brand>
                    <Link to='/'><img src='/assets/logo.png' width='150px' alt='logo'/></Link>
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className='align-items-center justify-content-end header'>
                    <Nav className="mr-auto">
                    </Nav>
                    <Nav>
                        <Nav.Link href='/watchlist' className='text-center mx-2'>WATCHLIST</Nav.Link>
                        <Nav.Link href='/favourites' className='text-center mx-2'>FAVOURITES</Nav.Link>
                        <div className='user'>
                            <div className='d-flex justify-content-center' onClick={() => setShowMenu(!showMenu)}>
                                <div className='p-2 bg-secondary rounded-circle'><i className="fas fa-user fa-lg p-1"></i></div>
                            </div>
                            {showMenu &&
                                <div className='menu'>
                                    <div>{auth.user}</div>
                                    <hr/>
                                    <div onClick={handleLogout}>Logout</div>
                                </div>
                            }
                        </div>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
