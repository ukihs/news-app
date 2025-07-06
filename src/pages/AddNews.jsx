import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { useNavigate, Link } from 'react-router-dom';

export default function AddNews() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // ✅ ฟังก์ชัน handleSubmit ที่คุณให้มา วางตรงนี้
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!title.trim() || !content.trim() || !imageFile) {
      setError('กรุณากรอกข้อมูลให้ครบทุกช่อง');
      return;
    }

    try {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      const userId = userData?.user?.id;

      if (!userId || userError) {
        setError('ไม่สามารถระบุผู้ใช้งานได้');
        return;
      }

      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const { data: uploadData, error: uploadError } = await supabase
        .storage
        .from('news-images')
        .upload(fileName, imageFile);

      if (uploadError) {
        console.error('❌ Upload error:', uploadError.message);
        setError('อัปโหลดรูปภาพล้มเหลว');
        return;
      }

      const imageUrl = supabase
        .storage
        .from('news-images')
        .getPublicUrl(fileName).data.publicUrl;

      const { error: insertError } = await supabase
        .from('news')
        .insert([{ title, content, image_url: imageUrl, user_id: userId }]);

      if (insertError) {
        console.error('❌ Insert error:', insertError.message);
        setError('เกิดข้อผิดพลาดในการบันทึก');
      } else {
        setSuccess(true);
        setTitle('');
        setContent('');
        setImageFile(null);
        setTimeout(() => navigate('/dashboard'), 1000);
      }
    } catch (err) {
      console.error('🧨 Unexpected error:', err.message);
      setError('เกิดข้อผิดพลาดในการบันทึก');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start px-4 py-10">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl">
        <Link to="/dashboard" className="text-sm text-gray-600 hover:underline block mb-3">
          ← กลับแดชบอร์ด
        </Link>

        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">📰 เพิ่มข่าวใหม่</h1>

        {error && <p className="text-red-600 mb-4">{error}</p>}
        {success && <p className="text-green-600 mb-4">✅ บันทึกสำเร็จ</p>}

        <label className="block mb-1 font-medium">หัวข้อข่าว</label>
        <input
          type="text"
          className="w-full border p-3 rounded mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className="block mb-1 font-medium">เนื้อหา</label>
        <textarea
          className="w-full border p-3 rounded mb-4 h-40"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <label className="block mb-1 font-medium">อัปโหลดรูปภาพ</label>
        <input
          type="file"
          accept="image/*"
          className="w-full border p-2 rounded mb-6"
          onChange={(e) => setImageFile(e.target.files[0])}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white py-3 px-6 rounded hover:bg-blue-700 transition"
        >
          💾 เพิ่มข่าว
        </button>
      </form>
    </div>
  );
}
