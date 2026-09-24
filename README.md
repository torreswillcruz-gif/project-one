# Project One

A clean company website with a static marketing site and a Next.js dashboard.

## Structure

- `index.html` — original public marketing home page
- `src/pages/login.html` — original static login page
- `app/` — Next.js App Router entry points and global styles
- `components/dashboard-shell.tsx` — interactive dashboard UI
- `src/css/` and `src/js/` — static site styles and behavior
- `src/assets/` — images and icons

## Run the Next.js dashboard

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The dashboard is available at the root route `/` when running Next.js.

The dashboard currently uses sample data. Connect its project, activity, user, and authentication actions to your API or database before using it in production.
