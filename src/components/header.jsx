import React from 'react'
import { useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { userLogout } from '../store/auth/actions';

import '../styles/header.css'

export default function Header() {

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const history = useHistory();
    const [showMenu, setShowMenu] = useState(false);

    const handleLogout = ()=> {
        dispatch(userLogout());
        localStorage.removeItem('persist:root');
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
                    <Nav className='nav-links'>
                        <Link to='/watchlist' className='text-center mx-2 my-2'>WATCHLIST</Link>
                        <Link to='/favourites' className='text-center mx-2 my-2'>FAVOURITES</Link>
                        <div className='user ps-md-2'>
                            <div className='d-flex justify-content-center' onClick={() => setShowMenu(!showMenu)}>
                                <div className='p-2 bg-secondary rounded-circle'><i className="fas fa-user fa-lg p-1"></i></div>
                            </div>
                            {showMenu &&
                                <div className='menu'>
                                    <p className='text-center'>{auth.user}</p>
                                    <Link to='edit-profile'><div>Edit Profile</div></Link>
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
