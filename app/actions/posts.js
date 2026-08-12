'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function addPostAction(prevState, formData) {
  const title = formData.get('title');
  const excerpt = formData.get('excerpt');
  const content = formData.get('content');
  const image = formData.get('image'); 
  const category = formData.get('category');  


  if (!title || !content) {
    return { error: 'The article must have title and content.' };
  }

  const post = await prisma.posts.create({ 
    data: {
      title,
      excerpt,
      content,
      image,
      user: 'admin',
      category
    }
  });

  if(!post) {
    return { error: 'Could not add article' };
  }
  revalidatePath('/dashboard');
}

export async function getArticles () {
  const articles = await prisma.posts.findMany();
  return articles;
}

export async function deleteById(id) {
  const deletedPost= await prisma.posts.delete({
    where:{ id: parseInt(id) }
  })
}

