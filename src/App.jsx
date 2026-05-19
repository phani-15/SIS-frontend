import React from 'react';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './components/AppRoutes';

export default function App() {
  return (
    <div className='flex flex-col min-h-screen'>
      <BrowserRouter>
        <AppRoutes/>
      </BrowserRouter>
    </div>
  );
}
