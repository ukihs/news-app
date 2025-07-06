import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AddNews from './pages/AddNews';
import EditNews from './pages/EditNews';
import ViewNews from './pages/ViewNews';
import Navbar from './components/Navbar';
import { supabase } from './utils/supabaseClient';
import { useEffect, useState } from 'react';
import EmailConfirmed from './pages/EmailConfirmed';

export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session);
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => listener?.subscription.unsubscribe();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar session={session} />

      <main className="flex-1">
        <Routes>
          <Route path="/email-confirmed" element={<EmailConfirmed />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/news/:id" element={<ViewNews />} />
          <Route element={<Protected session={session} />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add" element={<AddNews />} />
            <Route path="/edit/:id" element={<EditNews />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      
      <footer className="bg-black text-white text-center py-6">
        <p className="text-sm">
          © {new Date().getFullYear()} NewsApp. All rights reserved.
        </p>
        <p className="text-xs text-gray-400 mt-1">
          พัฒนาโดย ชาคริต ธีรนันทน์
        </p>
      </footer>
    </div>
  );
}

function Protected({ session }) {
  return session ? <Outlet /> : <Navigate to="/login" replace />;
}
