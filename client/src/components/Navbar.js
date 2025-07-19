import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    setMenuOpen(false);
  };
  return (
    <nav className="bg-white shadow p-2 sm:p-4 mb-8 flex items-center rounded relative w-full">
      <Link to="/" className="flex items-center space-x-2">
        <img src={require('../assets/tb-logo.png')} alt="TB Logo" className="w-12 h-12 sm:w-14 sm:h-14 rounded" style={{ background: 'none' }} />
        <span className="text-blue-700 font-bold text-lg sm:text-xl">TravelBringer</span>
      </Link>
      <button
        className="md:hidden ml-auto text-blue-700 focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation"
      >
        <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <div className={`flex-col md:flex-row md:flex space-y-2 sm:space-y-4 md:space-y-0 md:space-x-4 absolute md:static top-full left-0 w-full md:w-auto bg-white md:bg-transparent shadow md:shadow-none rounded md:rounded-none z-20 transition-all duration-200 ${menuOpen ? 'flex' : 'hidden md:flex'}`}>
        <Link to="/post-travel" className="text-gray-600 hover:text-blue-600 px-4 py-2 block" onClick={() => setMenuOpen(false)}>Post Travel</Link>
        <Link to="/dashboard" className="text-gray-600 hover:text-blue-600 px-4 py-2 block" onClick={() => setMenuOpen(false)}>Dashboard</Link>
        {localStorage.getItem("token") ? (
          <button onClick={logout} className="text-red-600 hover:text-red-800 px-4 py-2 block">Logout</button>
        ) : (
          <Link to="/login" className="text-gray-600 hover:text-blue-600 px-4 py-2 block" onClick={() => setMenuOpen(false)}>Login</Link>
        )}
      </div>
    </nav>
  );
}
