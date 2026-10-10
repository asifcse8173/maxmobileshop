# Max Mobile Shop (React + Vite + Supabase admin)

## 1. Run the website
    npm install
    npm run dev        # open http://localhost:5173
    npm run build      # production files in /dist

Without Supabase the site shows the data in `src/data/`. Set up Supabase to manage products and offers from the admin panel.

## 2. Set up the admin panel (Supabase, free plan is enough)
1. Create a project at https://supabase.com
2. Open **SQL Editor -> New query**, paste everything from `supabase/schema.sql`, click **Run**.
   This creates the products and offers tables, the photo storage, and the security rules.
3. Open **Authentication -> Users -> Add user**. Enter your email and a strong password.
   This is your admin login.
4. IMPORTANT (security): in the SQL you pasted in step 2, replace `your-admin-email@example.com`
   with the SAME email as step 3 BEFORE you click Run. Only emails in that list can change the shop.
   Also open **Authentication -> Sign In / Providers -> Email** and turn OFF "Allow new users to sign up".
5. Open **Project Settings -> API**. Copy the Project URL and the anon public key.
6. Copy `.env.example` to `.env` and paste both values. Restart `npm run dev`.
7. Open http://localhost:5173/#/admin and sign in.
8. In the admin, click **Import sample products** and **Import sample offers** once to start.

## What the admin can do
- Products: add, edit, delete, change price, mark in stock / out of stock, upload a photo
- Offers: add, edit, show or hide, delete (changes the top banner of the website)

## Deploying (Netlify, Vercel etc.)
Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in the host's environment variables, then deploy.
The admin is at `your-site.com/#/admin`.
Security headers: `public/_headers` is used by Netlify, `vercel.json` by Vercel.

## Edit shop details (not in admin yet)
- src/data/shop.js     shop name, WhatsApp number, address, hours, map link
- src/data/services.js repair services
- src/data/prices.js   repair price estimate by brand
- src/data/reviews.js  customer reviews
- public/shop.jpg      shop photo
