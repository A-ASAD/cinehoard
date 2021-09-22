import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

export default function Dashboard() {
    const history = useHistory();

    const handleLogout = () => {
        localStorage.removeItem('token');
        history.push('/login')
    }

    useEffect(() => {
        // redirect to login if not logged in
        if(!localStorage.getItem('token')){
            history.push('/login')
        }
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            <div>Dashboard</div>
            <Button variant='danger' onClick={handleLogout}>
                Logout
            </Button>
        </div>
    )
}
