This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## RSVP App (Next.js + Supabase)

A simple RSVP application built with Next.js App Router, Supabase, Tailwind CSS, and Shadcn UI components. Guests can submit their RSVP details, and admins can view and filter responses on a protected admin page.

## Demo

- Local dev server: http://localhost:3000
- Admin area: http://localhost:3000/admin (protected by Supabase auth; redirects to `/login` if unauthenticated)

## Features

- RSVP form with validation and success/error toasts
- Calendar preview of the event date
- Email notifications via EmailJS after successful submission
- Supabase Postgres table for persisting RSVPs
- Admin table view with client-side filtering by name
- Route protection for `/admin/*` using middleware

## Tech Stack

- Next.js 15 (App Router)
- React 19
- Supabase (auth + database)
- Tailwind CSS 4 + Shadcn UI primitives
- date-fns, lucide-react, sonner (toasts)

## Project Structure

- `app/_components/RSVPForm.tsx`: Client form for submitting RSVPs
- `app/_components/RSVPTable.tsx`: Client table to display RSVPs with filter
- `app/actions/submitRSVP.ts`: Server action to insert an RSVP into Supabase
- `app/actions/getRSVPs.ts`: Server action to fetch RSVPs
- `app/actions/auth.ts`: Server actions for sign-in/out
- `app/utils/supabase/server.tsx`: Creates a Supabase server client with cookies
- `app/utils/supabase/middleware.ts`: Session sync + `/admin` protection
- `app/utils/strings.ts`: App copy and event constants (date, location labels)

## Prerequisites

- Node.js 18+
- A Supabase project (URL + anon/public key)
- An EmailJS account (public key, service ID, template ID)

## Environment Variables

Create a `.env.local` file in the project root with the following values:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key

# EmailJS (client-side)
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_emailjs_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_emailjs_template_id

# Optional (used in strings.ts)
EMAIL_TO=recipient@example.com
```

## Database Setup (Supabase)

Create a table `rsvps` with the following columns:

- `id`: uuid, default `gen_random_uuid()` (primary key)
- `name`: text, not null
- `email`: text, not null, unique (optional but recommended)
- `accompany`: int4, not null, default 0
- `attendance`: text, not null (values: `yes` or `no`)
- `notes`: text, nullable
- `created_at`: timestamptz, default `now()`

Row Insert happens in `app/actions/submitRSVP.ts` and Select in `app/actions/getRSVPs.ts`.

## Authentication and Route Protection

- Email/password sign-in via Supabase in `app/actions/auth.ts`.
- Middleware `app/utils/supabase/middleware.ts` checks session and redirects unauthenticated users visiting `/admin` to `/login`.
- Supabase client is configured in `app/utils/supabase/server.tsx` using `@supabase/ssr` and Next cookies.

## Scripts

```bash
# Start dev server
npm run dev

# Lint
npm run lint

# Build production
npm run build

# Start production server
npm run start
```

## Run Locally

1. Install dependencies
   ```bash
   npm install
   ```
2. Add `.env.local` as shown above
3. Create the `rsvps` table in Supabase
4. Start the app
   ```bash
   npm run dev
   ```
5. Visit `http://localhost:3000`
6. To access `/admin`, create a user in Supabase Auth and sign in via `/login`.

## Customization

- Update copy and event details in `app/utils/strings.ts`:
  - `eventDate` (YYYY-MM-DD)
  - `eventLocation`
  - Labels and placeholders
- The map button in `RSVPForm.tsx` opens Google Maps using `strings.eventLocation`.

## Related Repository

If you are interested in another project by the same author, check out:

- React Movies with TMDB API: https://github.com/MohmmedNasser/React-Movies-With-TMDB-API

 You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
 
 ## Deploy on Vercel
 
 The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
