import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function RefrshHandler({ setIsAuthenticated }) {
    const location = useLocation();
    const navigate = useNavigate();
    console.log(location.pathname);
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('loggedInUser'));
        if (userInfo?.jwtToken) {
            setIsAuthenticated(true);
            if (location.pathname === '/' ||
                location.pathname === '/login' ||
                location.pathname === '/signup' ||
                location.pathname === '/forgot-password' ||
                location.pathname === '/verify-otp' ||
                location.pathname === '/reset-password'
            ) {
                navigate('/home', { replace: false });
            }
        }
    }, [location, navigate, setIsAuthenticated])

    return (
        null
    )
}

export default RefrshHandler