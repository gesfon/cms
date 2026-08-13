This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
It uses [Prisma](https://github.com/prisma/prisma) and SQLite as the Database.
To switch databases change the provider or install other adapters. You should run `npx prisma generate` when doing changes in the database.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can can delete or start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

Use `test@site.com` as username and `test` as password for a preview. 

You can query the `dev.db` file and perform other operations directly with the `sqlite3` command line tool.

There is also a posts API available at `/api/posts`.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.
