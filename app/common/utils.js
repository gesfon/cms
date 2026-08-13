import React, { useState } from 'react';

export default function SearchBox({ props }) {

  const articles = props.articles;

  const [searchTerm, setSearchTerm] = useState('');

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8 relative">
        <svg className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input type="text" placeholder="Search articles..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all" />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article) => (
            <div key={article.id} className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {article.title}
              </h3>
              <p className="text-gray-600">
                {article.excerpt}
              </p>
            </div>
          ))
        ) : (
          <div className="col-span-2 text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
            <p className="text-gray-500 text-lg">
              No articles found matching "{searchTerm}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
}