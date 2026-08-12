'use client';

import Image from "next/image";
import { useState, useEffect } from 'react';

export default function Home() {

  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await fetch("/api/posts");
      const articlesData = await response.json();
      setArticles(articlesData);
    };

    fetchArticles();
  }, []);

  const truncateText = (text, length) => {
    if (text.length <= length) {
      return text;
    }

    return text.substring(0, length) + '\u2026';
  };

  return (
    <section className="h-full h-screen text-gray-400 body-font bg-gray-900">
      <div className="flex flex-wrap -m-4">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap w-full mb-20">
          <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-white">Articles</h1>
            <div className="h-1 w-20 bg-indigo-500 rounded"></div>
          </div>
          <p className="lg:w-1/2 w-full leading-relaxed text-gray-400 text-opacity-90">
            {/* Truncate dev.db sqlite3 file to add new data. */}
          </p>
        </div>        
        <div className="flex flex-wrap -m-4">
          {articles && articles.map((article) => (
              <div key={article.id} className="xl:w-1/4 md:w-1/2 p-4">
                <div className="bg-gray-800 bg-opacity-40 p-6 rounded-lg">
                  {article.image && (
                  <Image className="object-cover object-center mb-6" src={article.image} alt={article.title} width={300} height={160} />
                  )}
                  <h3 className="tracking-widest text-indigo-400 text-xs font-medium title-font">{article.category}</h3>
                  <h2 className="text-lg text-white font-medium title-font mb-4">{truncateText(article.title, 30)}</h2>
                  <p className="leading-relaxed text-base">{truncateText(article.excerpt, 100)}</p>
                </div>
              </div>
          ))}
          </div>
        </div>
      </div>  
    </section>
  );
}

