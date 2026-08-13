import { NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";

const posts = await prisma.posts.findMany(
  {
    orderBy: {
      createdAt: 'desc'
    }
  }
) || {};

export async function GET() {
  return NextResponse.json(posts);
}