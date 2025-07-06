import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!email || !password || !confirmPassword) {
      setError('กรุณากรอกข้อมูลให้ครบ');
      return;
    }

    if (password !== confirmPassword) {
      setError('รหัสผ่านไม่ตรงกัน');
      return;
    }

    const { error } = await supabase.auth.signUp({ email, password });
    if (error) setError(error.message);
    else {
      setMessage('✅ ลงทะเบียนสำเร็จ! กรุณายืนยันอีเมลของคุณ');
      setTimeout(() => navigate('/login'), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">สมัครสมาชิก</h2>

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
        <input
          type="password"
          className="w-full p-3 mb-5 border rounded text-lg"
          placeholder="ยืนยันรหัสผ่าน"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {error && <p className="text-red-600 mb-3">{error}</p>}
        {message && <p className="text-green-600 mb-3">{message}</p>}

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded text-lg hover:bg-green-700"
        >
          สมัครสมาชิก
        </button>

        <p className="mt-6 text-center text-base">
          เป็นสมาชิกอยู่แล้ว?{' '}
          <Link to="/login" className="text-blue-600 underline hover:text-blue-800">
            เข้าสู่ระบบ
          </Link>
        </p>
      </form>
    </div>
  );
}
