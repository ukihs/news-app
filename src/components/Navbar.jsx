import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { FaUserCircle } from 'react-icons/fa';
import './Navbar.css';

export default function Navbar() {
  const [session, setSession] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    };
    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => listener?.subscription.unsubscribe();
  }, []);

  // ปิด dropdown เมื่อคลิกข้างนอก
  useEffect(() => {
    const closeDropdown = () => setDropdownOpen(false);
    window.addEventListener('click', closeDropdown);
    return () => window.removeEventListener('click', closeDropdown);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <header className="bg-black px-4 py-3 flex justify-between items-center text-white">
      <Link
        to="/"
        className="text-xl font-bold hoverable transition hover:text-blue-400"
      >
        NewsApp
      </Link>

      <nav className="flex items-center gap-6 relative">
        {session?.user && (
          <Link
            to="/dashboard"
            className="hoverable transition hover:text-blue-400"
          >
            Dashboard
          </Link>
        )}

        {/* ไอคอน User */}
        <div
          className="relative"
          onClick={(e) => {
            e.stopPropagation();
            setDropdownOpen(!dropdownOpen);
          }}
        >
          <FaUserCircle className="text-2xl cursor-pointer hover:text-green-400" />
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-36 bg-white shadow rounded text-black z-50">
              {session?.user ? (
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  🔓 Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    🔐 Login
                  </Link>
                  <Link
                    to="/register"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    📝 Register
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
