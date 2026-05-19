import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from '../Pages/Home'
import Header from './Header';
import Login from '../Pages/Login';

export default function AppRoutes() {
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
                </Routes>
            </main>
        </>
    );
}
