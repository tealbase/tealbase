# Tealbase Next.js Auth & User Management Starter

This example will set you up for a very common situation: users can sign up or sign in and then update their account with public profile information, including a profile image.

This demonstrates how to use:

- User signups using Tealbase [Auth](https://tealbase.com/auth).
  - Tealbase [Auth Helpers for Next.js](https://tealbase.com/docs/guides/auth/auth-helpers/nextjs).
  - Tealbase [pre-built Auth UI for React](https://tealbase.com/docs/guides/auth/auth-helpers/auth-ui).
- User avatar images using Tealbase [Storage](https://tealbase.com/storage)
- Public profiles restricted with [Policies](https://tealbase.com/docs/guides/auth#policies).
- Frontend using [Next.js](<[nextjs.org/](https://nextjs.org/)>).

## Technologies used

- Frontend:
  - [Next.js](https://github.com/vercel/next.js) - a React framework for production.
  - [Tealbase.js](https://tealbase.com/docs/library/getting-started) for user management and realtime data syncing.
  - Tealbase [Auth Helpers for Next.js](https://tealbase.com/docs/guides/auth/auth-helpers/nextjs).
  - Tealbase [pre-built Auth UI for React](https://tealbase.com/docs/guides/auth/auth-helpers/auth-ui).
- Backend:
  - [tealbase.com/dashboard](https://tealbase.com/dashboard/): hosted Postgres database with restful API for usage with Tealbase.js.

## Instant deploy

The Vercel deployment will guide you through creating a Tealbase account and project. After installation of the Tealbase integration, all relevant environment variables will be set up so that the project is usable immediately after deployment 🚀.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Ftealbase%2Ftealbase%2Ftree%2Fmaster%2Fexamples%2Fuser-management%2Fnextjs-user-management&project-name=tealbase-nextjs-user-management&repository-name=tealbase-nextjs-user-management&integration-ids=oac_VqOgBHqhEoFTPzGkPd7L0iH6&external-id=https%3A%2F%2Fgithub.com%2Ftealbase%2Ftealbase%2Ftree%2Fmaster%2Fexamples%2Fuser-management%2Fnextjs-user-management)

### 1. Create new project

Sign up to Tealbase - [https://tealbase.com/dashboard](https://tealbase.com/dashboard) and create a new project. Wait for your database to start.

### 2. Run "User Management" Quickstart

Once your database has started, head over to your project's `SQL Editor` and run the "User Management Starter" quickstart. On the `SQL editor` page, scroll down until you see `User Management Starter: Sets up a public Profiles table which you can access with your API`. Click that, then click `RUN` to execute that query and create a new `profiles` table. When that's finished, head over to the `Table Editor` and see your new `profiles` table.

### 3. Get the URL and Key

Go to the Project Settings (the cog icon), open the API tab, and find your API URL and `anon` key, you'll need these in the next step.

The `anon` key is your client-side API key. It allows "anonymous access" to your database, until the user has logged in. Once they have logged in, the keys will switch to the user's own login token. This enables row level security for your data. Read more about this [below](#postgres-row-level-security).

![image](https://user-images.githubusercontent.com/10214025/88916245-528c2680-d298-11ea-8a71-708f93e1ce4f.png)

**_NOTE_**: The `service_role` key has full access to your data, bypassing any security policies. These keys have to be kept secret and are meant to be used in server environments and never on a client or browser.

## Tealbase details

### Using a Remote Tealbase Project

1. Create or select a project on [Tealbase Dashboard](https://tealbase.com/dashboard).
2. Copy and fill the dotenv template `cp .env.production.example .env.production`
3. Link the remote project to your local environment:

```bash
TEALBASE_ENV=production npx tealbase@latest link --project-ref <your-project-ref>
```

3. Sync the configuration:

```bash
TEALBASE_ENV=production npx tealbase@latest config push
```

4. Sync the database schema:

```bash
TEALBASE_ENV=production npx tealbase@latest db push
```

## Vercel Preview with Branching

Tealbase integrates seamlessly with Vercel's preview branches, giving each branch a dedicated Tealbase project. This setup allows testing database migrations or service configurations safely before applying them to production.

### Steps

1. Ensure the Vercel project is linked to a Git repository.
2. Configure the "Preview" environment variables in Vercel:

   - `NEXT_PUBLIC_TEALBASE_URL`
   - `NEXT_PUBLIC_TEALBASE_ANON_KEY`

3. Create a new branch, make changes (e.g., update `max_frequency`), and push the branch to Git.
   - Open a pull request to trigger Vercel + Tealbase integration.
   - Upon successful deployment, the preview environment reflects the changes.

![Preview Checks](https://github.com/user-attachments/assets/db688cc2-60fd-4463-bbed-e8ecc11b1a39)

### Postgres Row level security

This project uses very high-level Authorization using Postgres' Row Level Security.
When you start a Postgres database on Tealbase, we populate it with an `auth` schema, and some helper functions.
When a user logs in, they are issued a JWT with the role `authenticated` and their UUID.
We can use these details to provide fine-grained control over what each user can and cannot do.

This is a trimmed-down schema, with the policies:

```sql
-- Create a table for public profiles
create table profiles (
  id uuid references auth.users not null primary key,
  updated_at timestamp with time zone,
  username text unique,
  full_name text,
  avatar_url text,
  website text,

  constraint username_length check (char_length(username) >= 3)
);
-- Set up Row Level Security (RLS)
-- See https://tealbase.com/docs/guides/auth/row-level-security for more details.
alter table profiles
  enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check ((select auth.uid()) = id);

create policy "Users can update own profile." on profiles
  for update using ((select auth.uid()) = id);

-- This trigger automatically creates a profile entry when a new user signs up via Tealbase Auth.
-- See https://tealbase.com/docs/guides/auth/managing-user-data#using-triggers for more details.
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Set up Storage!
insert into storage.buckets (id, name)
  values ('avatars', 'avatars');

-- Set up access controls for storage.
-- See https://tealbase.com/docs/guides/storage#policy-examples for more details.
create policy "Avatar images are publicly accessible." on storage.objects
  for select using (bucket_id = 'avatars');

create policy "Anyone can upload an avatar." on storage.objects
  for insert with check (bucket_id = 'avatars');

create policy "Anyone can update their own avatar." on storage.objects
  for update using ( auth.uid() = owner ) with check (bucket_id = 'avatars');
```

## More Tealbase Examples & Resources

## Examples

These official examples are maintained by the Tealbase team:

- [Next.js Subscription Payments Starter](https://github.com/vercel/nextjs-subscription-payments)
- [Next.js Slack Clone](https://github.com/tealbase/tealbase/tree/master/examples/slack-clone/nextjs-slack-clone)
- [Next.js 13 Data Fetching](https://github.com/tealbase/tealbase/tree/master/examples/caching/with-nextjs-13)
- [And more...](https://github.com/tealbase/tealbase/tree/master/examples)

## Other resources

- [[Docs] Next.js User Management Quickstart](https://tealbase.com/docs/guides/getting-started/tutorials/with-nextjs)
- [[Egghead.io] Build a SaaS product with Next.js, Tealbase and Stripe](https://egghead.io/courses/build-a-saas-product-with-next-js-tealbase-and-stripe-61f2bc20)
- [[Blog] Fetching and caching Tealbase data in Next.js 13 Server Components](https://tealbase.com/blog/fetching-and-caching-tealbase-data-in-next-js-server-components)

## Authors

- [Tealbase](https://tealbase.com)

Tealbase is open source. We'd love for you to follow along and get involved at https://github.com/tealbase/tealbase
