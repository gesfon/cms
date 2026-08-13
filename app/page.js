'use client';

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

  return (
    <section className="text-gray-400 bg-gray-900 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="-my-8 divide-y-2 divide-gray-800">
          {articles && articles.map((article, index) => (
            <div key={index} className="py-8 flex flex-wrap md:flex-nowrap">
              <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                <span className="font-semibold title-font text-white">{article.category}</span>
                <span className="mt-1 text-gray-500 text-sm">{new Date(article.createdAt).toISOString().split('T')[0]}</span>
              </div>
              <div className="md:flex-grow">
                <h2 className="text-2xl font-medium text-white title-font mb-2">{article.title}</h2>
                <p className="leading-relaxed">{article.excerpt}</p>
                <a className="text-indigo-400 inline-flex items-center mt-4">Learn More
                  <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

