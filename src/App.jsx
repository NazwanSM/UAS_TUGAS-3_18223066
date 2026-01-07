import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

const Home = () => (
  <div className="min-h-screen bg-siskam-green flex flex-col items-center justify-center text-white text-center p-6">
    <div className="max-w-2xl">
      <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      </div>
      <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">SiskamLinked</h1>
      <p className="text-lg md:text-xl mb-6 text-white/80 max-w-md mx-auto">
        Portal Admin - Sistem Keamanan Lingkungan Terpadu
      </p>
      <p className="text-sm mb-10 text-white/60 max-w-md mx-auto">
        Kelola petugas patroli dan pantau keamanan lingkungan
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a 
          href="/login" 
          className="bg-white text-siskam-green hover:bg-gray-100 px-8 py-3.5 rounded-xl font-bold text-lg shadow-lg transition transform hover:scale-105 flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          Login Petugas
        </a>
        <a 
          href="/dashboard" 
          className="bg-white/10 hover:bg-white/20 border border-white/30 px-8 py-3.5 rounded-xl font-semibold text-lg transition flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
          </svg>
          Dashboard
        </a>
      </div>
    </div>
    
    <div className="absolute bottom-6 text-white/50 text-sm">
      Patrol Service - Admin Portal
    </div>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}