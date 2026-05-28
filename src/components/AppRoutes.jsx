import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from '../Pages/Home'
import Header from './Header';
import Login from '../Pages/Login';
import HodLogin from '../Pages/HodLogin';
import Admin from '../Pages/Admin';
import Profile from '../Pages/Profile'
import NotFound from '../Pages/NotFound';
import AdministratorsLogin from '../Pages/AdministratorsLogin';
import HODDashboard from '../Pages/HODDashboard';

function AppRoutes() {
    const location = useLocation()
    const loc = location.pathname
    const showHeader = loc !== '/' && loc!=='/about';
    const showFooter = loc !== '/hod' && loc!=='/login' && loc!=='/ofc' && loc!=='/admin'
    return (
        <>
            {/* // {showHeader &&
            //     <Header />}
            <main className='grow'>
                <Routes>
                    <Route path='/' element={<Home />} />
                </Routes>
            </main>
            // {showFooter && <Footer/>} */}
            <Header />
            <main className='grow'>
                <Routes>
                    <Route path='/' element={<Home />} />
                    
                    <Route path='/login' element={<Login />} />
                    <Route path='/profile' element={<Profile />} />

                    <Route path='/hod' element={<HodLogin />} />
                    <Route path = "/hodboard" element= {<HODDashboard />} />

                    <Route path='/administrator' element={<AdministratorsLogin />} />
                    
                    <Route path='/admin' element={<Admin />} />

                    <Route path='*' element={<NotFound />} />
                </Routes>
            </main>
        </>
    );
}

export default AppRoutes;