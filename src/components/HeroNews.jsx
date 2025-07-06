import { Link } from 'react-router-dom';

export default function HeroNews({ news }) {
  if (!news) return null;

  return (
    <div className="relative w-full h-64 sm:h-96 mb-8 rounded-lg overflow-hidden shadow-lg">
      <img
        src={news.image_url}
        alt={news.title}
        className="absolute w-full h-full object-cover brightness-75"
        loading="lazy"
      />
      <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
        
        <p className="text-sm italic text-gray-300 mb-1">
          {new Date(news.created_at).toLocaleDateString('th-TH', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>

        <h1 className="text-2xl sm:text-4xl font-bold mb-2">{news.title}</h1>
        <p className="text-sm sm:text-base line-clamp-2 mb-3">{news.content}</p>
        <Link
          to={`/news/${news.id}`}
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium"
        >
          อ่านต่อ →
        </Link>
      </div>
    </div>
  );
}
