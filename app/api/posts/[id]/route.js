import { NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";

export async function GET(request, { params }) {
  const { id } = await params;

  const post = await prisma.posts.findUnique({
      where: {
        id: Number(id), 
      },
  });

  return NextResponse.json(post);
}