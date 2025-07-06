import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('กรุณากรอกข้อมูลให้ครบ');
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError('อีเมลหรือรหัสผ่านไม่ถูกต้อง');
    else navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">เข้าสู่ระบบ</h2>

        <input
          type="email"
          className="w-full p-3 mb-4 border rounded text-lg"
          placeholder="อีเมล"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="w-full p-3 mb-4 border rounded text-lg"
          placeholder="รหัสผ่าน"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-600 mb-3">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded text-lg hover:bg-blue-700"
        >
          เข้าสู่ระบบ
        </button>

        <p className="mt-6 text-center text-base">
          ยังไม่ได้สมัคร?{' '}
          <Link to="/register" className="text-green-600 underline hover:text-green-800">
            สมัครสมาชิก
          </Link>
        </p>
      </form>
    </div>
  );
}
