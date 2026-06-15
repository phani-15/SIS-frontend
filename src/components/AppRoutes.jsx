import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from '../Pages/Home';
import Header from './Header';
import Login from '../Pages/Login';
import HodLogin from '../Pages/HodLogin';
import Admin from '../Pages/Admin';
import Profile from '../Pages/Profile';
import NotFound from '../Pages/NotFound';
import AdministratorsLogin from '../Pages/AdministratorsLogin';
import HODDashboard from '../Pages/HODDashboard';
import AddCreds from '../Pages/AddCreds';
import AdminDashboard from '../Pages/AdministratorsDashBoard';

/** Routes where the shared Header should NOT be shown */
const NO_HEADER_ROUTES = ['/login', '/hod', '/administrator', '/admin'];

function AppRoutes() {
    const { pathname } = useLocation();
    const showHeader = !NO_HEADER_ROUTES.includes(pathname);

    return (
        <>
            {showHeader && <Header />}
            <main className={showHeader ? '' : ''}>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/hod' element={<HodLogin />} />
                    <Route path='/hodboard' element={<HODDashboard />} />
                    <Route path='/administrator' element={<AdminDashboard />} />
                    <Route path='/admin' element={<Admin />} />
                    <Route path='/add' element={<AddCreds />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </main>
        </>
    );
}

export default AppRoutes;