import React, {useEffect} from 'react';
import {Routes, Route, Outlet, useNavigate} from 'react-router-dom';
import {NotFound} from '../components/NotFound';
import {

    Main,

} from '../pages/Dashboard';
import {Login} from '../pages';
import {Dashboard} from '../layout/Dashboard';
import {issetToken} from '../helpers/tokenStorage';
import OtherPages from "../pages/Dashboard/OtherPages/List";
import Users from "../pages/Dashboard/Users";
import Home2 from "../pages/Dashboard/Home2";


export const Routess = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!issetToken()) {
            navigate('/');
        }
    }, []);
    return (
        <Routes>
            <Route path='/'>
                <Route index element={<Login/>}/>
            </Route>
            <Route
                element={
                    <Dashboard>
                        <Outlet/>
                    </Dashboard>
                }>
                <Route path='/dashboard'>
                    <Route path='main'>
                        <Route index element={<Main/>}/>
                    </Route>
                    <Route path='users'>
                        <Route index element={<Users/>}/>
                    </Route>
                    <Route path='home2'>
                        <Route index element={<Home2/>}/>
                    </Route>
                </Route>

                <Route path='other-pages'>
                    <Route index element={<OtherPages/>}/>
                </Route>
            </Route>
            <Route path='*' element={<NotFound/>}/>
        </Routes>
    );
};
