'use client';

import { useState, useEffect, useActionState, useOptimistic } from 'react';
import { getArticles, addPostAction, deleteById } from '@/app/actions/posts';
import { logoutAction } from '@/app/actions/auth';
import Image from 'next/image';

export default function Dashboard() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const articles = await getArticles();
      setArticles(articles);
    };
    fetchArticles();
  }, []);

  function handleLogout() {
    logoutAction();
  }

  function deleteRow(id) {
    deleteById(id);
    setArticles((prevArticles) => prevArticles.filter((article) => article.id !== id));
  }

  const [optimisticArticle, setOptimisticArticle] = useOptimistic(articles, (currentArticles, newArticle) => [...currentArticles, newArticle]);
  
  const handleSubmit = async (prevState, formData) => {
    setOptimisticArticle({ 
      id:       Math.random(), 
      title:    formData.get('title'),
      excerpt:  formData.get('excerpt'),
      content:  formData.get('content'),
      image:    formData.get('image'),
      category: formData.get('category'),
    });

    return addPostAction(prevState, formData);
  };
  
  const [state, formAction, isPending] = useActionState(handleSubmit, null);

  return (
    <div className="min-h-screen bg-slate-900 p-4 md:p-8 flex flex-col lg:flex-row gap-8 text-slate-200 font-sans">
      <div className="w-full lg:w-1/3 bg-slate-800 p-6 md:p-8 rounded-xl shadow-xl h-fit border border-slate-700">
        <h2 className="text-2xl mb-6 text-white">Create Article</h2>   
        <form action={formAction} className="flex flex-col gap-4">
          {state?.error && <p style={{ color: 'red' }}>{state.error}</p>}
          <div>
            <label className="block text-sm font-medium mb-1.5 text-slate-300">Title</label>
            <input type="text" name="title" className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" placeholder="e.g.: My Awesome Post" required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5 text-slate-300">Excerpt</label>
            <input type="text" name="excerpt" className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" placeholder="A brief summary..."  required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5 text-slate-300">Category</label>
            <select name="category" className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-slate-100 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all">
              <option value="Technology">Technology</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="News">News</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5 text-slate-300">Image URL</label>
            <input type="url" name="image" className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" placeholder="https://example.com/image.jpg" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5 text-slate-300">Content</label>
            <textarea name="content" rows="6" className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none" placeholder="Write your article content here..." required></textarea>
          </div>
          <button type="submit" className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">{isPending ? 'Creating Article...' : 'Publish Article'}</button>
        </form>
        <div className="flex items-center justify-center mt-4 text-sm">
            <a href="#" onClick={handleLogout} className="text-indigo-400 hover:text-indigo-300">Logout</a>
        </div>
      </div>
      <div className="w-full lg:w-2/3 bg-slate-800 p-6 md:p-8 rounded-xl shadow-xl border border-slate-700 h-fit">
        <h2 className="text-2xl mb-6 text-white">Manage Articles</h2>  
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[500px]">
            <thead>
              <tr className="border-b border-slate-600 text-slate-400 text-sm uppercase tracking-wider">
                <th className="pb-4 font-semibold px-2">Image</th>
                <th className="pb-4 font-semibold px-2">Title</th>
                <th className="pb-4 font-semibold px-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
             {optimisticArticle && optimisticArticle.map((a, index) => {
                return (
                    <tr key={index} className="hover:bg-slate-700/30 transition-colors group">
                        <td className="py-4 px-2 w-20">
                            {a.image && (
                            <Image className="w-14 h-14 rounded-lg object-cover border border-slate-600 group-hover:border-slate-500 transition-colors" src={a.image} alt={a.title} width={100} height={100} />
                            )}
                        </td>
                        <td className="py-4 px-2">
                            <p className="font-semibold text-slate-100 text-lg">{a.title}</p>
                            <p className="text-sm text-slate-400">{a.category}</p>
                        </td>
                        <td className="py-4 px-2 text-right">
                            <button onClick={() => deleteRow(a.id)} className="bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-sm">Remove</button>
                        </td>
                    </tr>
                );
            })}
            </tbody>
          </table>
        </div>
        {articles.length === 0 && (
            <div className="text-center py-12">
                <p className="text-slate-400">No articles found. Create one to get started!</p>
            </div> 
        )} 
      </div>
    </div>
 );

}