import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { useParams } from 'react-router-dom';

export default function ViewNews() {
  const { id } = useParams();
  const [news, setNews] = useState(null);

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('news').select('*').eq('id', id).single();
      setNews(data);
    }
    load();
  }, [id]);

  if (!news) return <p className="text-center mt-10">Loading...</p>;

  return (
    <>
      {/* ✅ รูปเต็มจอแบบไทยรัฐ */}
      {news.image_url && (
        <div className="w-full">
          <img
            src={news.image_url}
            alt={news.title}
            className="w-full object-contain max-h-[600px] mx-auto"
            style={{ backgroundColor: 'black' }} 
          />
        </div>
      )}

      {/* ✅ เนื้อหาข่าว */}
      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* วันที่ */}
        <div className="text-sm text-gray-500 mb-2">
          📅 {new Date(news.created_at).toLocaleString('th-TH', {
            dateStyle: 'long',
            timeStyle: 'short',
          })}
        </div>

        {/* หัวข้อข่าว */}
        <h1 className="text-3xl font-bold mb-4 text-gray-900">{news.title}</h1>

        {/* เนื้อหา */}
        <div className="text-gray-800 text-lg leading-relaxed whitespace-pre-line">
          {news.content}
        </div>
      </div>
    </>
  );
}
