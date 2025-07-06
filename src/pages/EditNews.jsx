import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';

export default function EditNews() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function fetchNews() {
      const { data, error } = await supabase.from('news').select('*').eq('id', id).single();
      if (error) {
        setError('ไม่สามารถโหลดข้อมูลข่าว');
      } else {
        setTitle(data.title);
        setContent(data.content);
        setImageUrl(data.image_url);
      }
    }
    fetchNews();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!title.trim() || !content.trim()) {
      setError('กรุณากรอกข้อมูลให้ครบทุกช่อง');
      return;
    }

    let finalImageUrl = imageUrl;

    if (imageFile) {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase
        .storage
        .from('news-images')
        .upload(fileName, imageFile);

      if (uploadError) {
        setError('อัปโหลดรูปภาพล้มเหลว');
        return;
      }

      finalImageUrl = supabase.storage.from('news-images').getPublicUrl(fileName).data.publicUrl;
    }

    const { error: updateError } = await supabase
      .from('news')
      .update({ title, content, image_url: finalImageUrl })
      .eq('id', id);

    if (updateError) {
      setError('เกิดข้อผิดพลาดในการบันทึก');
    } else {
      setSuccess(true);
      setTimeout(() => navigate('/dashboard'), 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl"
      >
        <Link to="/dashboard" className="text-sm text-gray-600 hover:underline block mb-3">
          ← กลับแดชบอร์ด
        </Link>

        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
          📝 แก้ไขข่าว
        </h1>

        {imageUrl && (
          <img src={imageUrl} alt="ข่าว" className="rounded w-full mb-4" />
        )}

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

        <label className="block mb-1 font-medium">อัปโหลดรูปภาพใหม่ (ถ้ามี)</label>
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
          💾 บันทึกการแก้ไข
        </button>
      </form>
    </div>
  );
}
