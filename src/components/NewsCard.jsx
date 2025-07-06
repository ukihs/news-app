import { Link } from 'react-router-dom';

export default function NewsCard({ news }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300">
      <img
        src={news.image_url}
        alt={news.title}
        className="w-full h-48 object-cover"
        loading="lazy"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 line-clamp-2">{news.title}</h2>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{news.content}</p>
        <Link
          to={`/news/${news.id}`}
          className="text-blue-600 text-sm font-medium mt-3 inline-block hover:underline"
        >
          Read more
        </Link>
      </div>
    </div>
  );
}
