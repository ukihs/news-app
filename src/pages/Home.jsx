import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import NewsCard from '../components/NewsCard';
import HeroNews from '../components/HeroNews';


export default function Home() {
  const [news, setNews] = useState([]);
  const [keyword, setKeyword] = useState('');

  async function loadNews(search = '') {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .or(`title.ilike.%${search}%,content.ilike.%${search}%`)
      .order('created_at', { ascending: false });

    if (error) console.error("❌ Failed to load news:", error);
    else setNews(data ?? []);
  }

  useEffect(() => {
    loadNews();
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      loadNews(keyword.trim());
    }, 300); // รอ 0.3 วิ หลังพิมพ์ เพื่อไม่โหลดทุก keypress
    return () => clearTimeout(delay);
  }, [keyword]);

  return (
    <div className="container mx-auto px-4">
      <input
        type="text"
        className="w-full p-2 border mb-4 mt-6 rounded"
        placeholder="🔍 ค้นหาข่าวตามชื่อหรือเนื้อหา..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      {keyword === '' && news.length > 0 && <HeroNews news={news[0]} />}


      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6">
        {news.slice(keyword === '' ? 1 : 0).map(n => (
          <NewsCard key={n.id} news={n} />
        ))}
      </div>

    </div>
  );
}
