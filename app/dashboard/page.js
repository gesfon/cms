'use client';

import { useState, useEffect, useActionState, useOptimistic } from 'react';
import { getArticles, addPostAction, deleteById } from '@/app/actions/posts';
import { logoutAction } from '@/app/actions/auth';

export const dynamic = 'force-dynamic';

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

  const [optimisticArticle, addOptimisticArticle] = useOptimistic(
    articles,
    (currentArticles, newArticle) => [...currentArticles, newArticle]
  );

  const formSubmitHandler = async (prevState, formData) => {
    addOptimisticArticle({ 
      id:       Math.random(), 
      title:    formData.get('title'),
      excerpt:  formData.get('excerpt'),
      content:  formData.get('content'),
      image:    formData.get('image'),
      category: formData.get('category'),
    });

    return addPostAction(prevState, formData);
  };
  
  const [state, formAction, isPending] = useActionState(formSubmitHandler, null);

    return (
        <section className="flex items-center justify-center h-full text-gray-400 body-font bg-slate-900">
            <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
                <div className="lg bg-gray-800 bg-opacity-50 rounded-lg p-8 flex flex-col md:mx-auto w-full mt-10 md:mt-0">
                    <form action={formAction}>
                        {state?.error && <p style={{ color: 'red' }}>{state.error}</p>}
                        <h2 className="text-white text-lg font-medium title-font mb-5">Create Article (<a href="#" onClick={handleLogout} className="text-indigo-400 hover:text-indigo-300">Logout</a>)</h2>
                        <div className="relative mb-4">
                            <label htmlFor="title" className="leading-7 text-sm text-gray-400">Title</label>
                            <input type="text" id="title" name="title" className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                        <div className="relative mb-4">
                            <label htmlFor="excerpt" className="leading-7 text-sm text-gray-400">Excerpt</label>
                            <input type="text" id="excerpt" name="excerpt" className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                        <div className="relative mb-4">
                            <label htmlFor="content" className="leading-7 text-sm text-gray-400">Content</label>
                            <textarea rows="10" id="content" name="content" className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                        <div className="relative mb-4">
                            <label htmlFor="image" className="leading-7 text-sm text-gray-400">Image</label>
                            <input type="text" id="image" name="image" className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div> 
                        <div className="relative mb-4">
                            <label htmlFor="category" className="leading-7 text-sm text-gray-400">Category</label>
                            <input type="text" id="category" name="category" className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>                                        
                        <button type="submit" disabled={isPending} className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                            {isPending ? 'Creating article...' : 'Add Article'}
                        </button>
                        <hr className="my-5" />                    
                        <div className="overflow-x-auto rounded-lg border border-gray-700">
                        <table className="min-w-full divide-y-2 divide-gray-700 bg-slate-900 text-sm">
                            <tbody className="divide-y divide-gray-700 text-gray-100">
                                {optimisticArticle && optimisticArticle.map((a, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className="px-4 py-3 font-medium text-gray-100">
                                                {a.image && (
                                                    <img className="object-cover object-center" src={a.image} alt={a.title} width={100} height={100} />
                                                )}
                                            </td>
                                            <td className="px-4 py-3 font-medium text-gray-100">{a.title}</td>
                                            <td className="px-4 py-3">
                                                <button className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-sm" onClick={() => deleteRow(a.id)}>
                                                    Remove
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </form>
            </div>
        </div>
    </section>
    );
}