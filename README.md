# Will Solutions

Clean company website and dashboard built with Next.js App Router.

## Routes

- `/` — Will Solutions public home page
- `/login` — sign-in page
- `/dashboard` — internal workspace dashboard
- `/users` — user registration page
- `/api/users` — user registration API

## Shared branding

The company name and contact details are centralized in `lib/brand.ts`. Update that file to change the brand throughout the Next.js components.

The legacy static `index.html` is kept for compatibility and uses the same Will Solutions text, but it cannot import TypeScript constants directly.

## Environment

Create a local `.env.local` file or configure the variable in Vercel:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority
