import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import './admin-theme.css';

function AdminLayout() {
  return (
    <div className="d-flex">
      <Sidebar />
      <main className="flex-grow-1 p-4" style={{ minHeight: '100vh', backgroundColor: '#F7F7F7' }}>
      
        <Outlet />
        
        <footer className="mt-5 pt-3 border-top text-muted text-center">
          <small>Panel de Administración HuertoHogar - Desarrollo Fullstack II</small>
        </footer>
      </main>
    </div>
  );
}

export default AdminLayout;