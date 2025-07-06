import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { Link, useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [news, setNews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      const { data: sessionData, error: sessionError } = await supabase.auth.getUser();
      const userId = sessionData?.user?.id;

      if (!userId || sessionError) {
        console.error("🔒 ไม่สามารถดึงข้อมูลผู้ใช้งานได้", sessionError);
        return;
      }

      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('user_id', userId) // ✅ แสดงเฉพาะข่าวของตัวเอง
        .order('created_at', { ascending: false });

      if (error) {
        console.error("🚫 โหลดข่าวล้มเหลว", error.message);
      } else {
        setNews(data ?? []);
      }
    }

    load();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm('คุณแน่ใจว่าต้องการลบข่าวนี้?');
    if (confirm) {
      await supabase.from('news').delete().eq('id', id);
      setNews((prev) => prev.filter((n) => n.id !== id));
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">🗂️ จัดการข่าวของคุณ</h1>
        <Link
          to="/add"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          ➕ Add News
        </Link>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="text-left px-6 py-3 font-semibold">หัวข้อข่าว</th>
              <th className="text-left px-6 py-3 font-semibold">วันที่</th>
              <th className="text-center px-6 py-3 font-semibold">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {news.map((n) => (
              <tr key={n.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-3">{n.title}</td>
                <td className="px-6 py-3">
                  {new Date(n.created_at).toLocaleDateString('th-TH')}
                </td>
                <td className="px-6 py-3 text-center space-x-3">
                  <Link
                    to={`/edit/${n.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    ✏️ Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(n.id)}
                    className="text-red-600 hover:underline"
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
            {news.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center py-6 text-gray-400">
                  ยังไม่มีข่าวในระบบ
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
