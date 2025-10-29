# postgres-on-the-edge

This function allows you to access your Tealbase database directly via TCP from an edge function.

You can add a global cache to your database for fast access to your data, globally by simply connecting your Tealbase database to [PolyScale](https://polyscale.ai).

## Setup
1. Rename `.env.example` to `.env`
2. Insert Tealbase database connection string for `DATABASE_URL` in `.env` file
3. Replace `DATABASE_URL` with PolyScale connection string.

## Deploy

1. Run `tealbase functions deploy --no-verify-jwt postgres-on-the-edge`
2. Run `tealbase secrets set --env-file tealbase/functions/postgres-on-the-edge/.env`

Learn more about creating this function [here](https://www.youtube.com/watch?v=cl7EuF1-RsY).
