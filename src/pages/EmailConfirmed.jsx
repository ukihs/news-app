import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function EmailConfirmed() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded shadow-lg text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-4">✅ ยืนยันอีเมลสำเร็จ</h1>
        <p className="text-gray-700">ระบบกำลังพาคุณไปยังหน้าเข้าสู่ระบบ...</p>
      </div>
    </div>
  );
}

export default EmailConfirmed; 
