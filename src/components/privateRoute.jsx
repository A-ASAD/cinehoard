import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom';

export default function PrivateRoute({children, ...rest}) {
    const auth = useSelector(state => state.auth);
    return (
        <Route
            {...rest}
            render={() => {
                if(auth.isLoading){
                    return <div>Loading...</div>
                }
                else if(!auth.token){
                    return <Redirect to='/login' />
                }
                return children
            }}
        />
    )
}
