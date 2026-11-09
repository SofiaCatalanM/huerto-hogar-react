import React from 'react';
import Sidebar from '../admin/Sidebar';
import './admin-theme.css'; 

function AdminLayout({ children }) {
  return (
    <div className="d-flex">
      <Sidebar />
      <main className="flex-grow-1 p-4 bg-light" style={{ minHeight: '100vh' }}>
        {children}
        <footer className="mt-5 pt-3 border-top text-muted text-center">
          <small>Panel de Administración HuertoHogar - Desarrollo Fullstack II</small>
        </footer>
      </main>
    </div>
  );
}

export default AdminLayout;