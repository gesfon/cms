This is a [Next.js](https://nextjs.org) (16.3.0) project using [Prisma](https://github.com/prisma/prisma) (7.9.1) and SQLite as the Database. It's Tailwinded and uses no Typescript.

Use `test@site.com` as username and `test` as password for a preview. 

There are APIs available at `/api/posts` and `/api/posts/[id]` and the pages `/register`, `/login` and `/dashboard`. Change or delete the default `app/page.js` to build your blog or news site.

Make sure you have an `.env` file with the following:
```
DATABASE_URL="file:./dev.db"
AUTH_SECRET=a_32_chars_long_string
```
Run `npx auth secret` to generate a new secret.

You can query the `dev.db` file and perform other operations directly with the `sqlite3` command line tool. Run `npx prisma generate` when doing changes in the database.

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

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.
