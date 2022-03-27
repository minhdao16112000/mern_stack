import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { logout } from "../redux/actions/userActions";

const LogoutScreen = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(logout());
    }, [dispatch]);
    return <div></div>;
} 

export default LogoutScreen
