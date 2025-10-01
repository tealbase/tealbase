# AI Inference in Tealbase Edge Functions

Since Tealbase Edge Runtime [v1.36.0](https://github.com/tealbase/edge-runtime/releases/tag/v1.36.0) you can run the [`gte-small` model](https://huggingface.co/Tealbase/gte-small) natively within Tealbase Edge Functions without any external dependencies! This allows you to easily generate text embeddings without calling any external APIs!

## Semantic Search with pgvector and Tealbase Edge Functions

This demo consists of three parts:

1. A [`generate-embedding`](./tealbase/functions/generate-embedding/index.ts) database webhook edge function which generates embeddings when a content row is added (or updated) in the [`public.embeddings`](./tealbase/migrations/20240408072601_embeddings.sql) table.
2. A [`query_embeddings` Postgres function](./tealbase/migrations/20240410031515_vector-search.sql) which allows us to perform similarity search from an egde function via [Remote Procedure Call (RPC)](https://tealbase.com/docs/guides/database/functions?language=js).
3. A [`search` edge function](./tealbase/functions/search/index.ts) which generates the embedding for the search term, performs the similarity search via RPC function call, and returns the result.

## Deploy

- Link your project: `tealbase link`
- Deploy Edge Functions: `tealbase functions deploy`
- Update project config to [enable webhooks](https://tealbase.com/docs/guides/local-development/cli/config#experimental.webhooks.enabled): `tealbase config push`
- Navigate to the [database-webhook](./tealbase/migrations/20240410041607_database-webhook.sql) migration file and insert your `generate-embedding` function details.
- Push up the database schema `tealbase db push`

## Run

Run a search via curl POST request:

```bash
curl -i --location --request POST 'https://<PROJECT-REF>.tealbase.co/functions/v1/search' \
    --header 'Authorization: Bearer <TEALBASE_ANON_KEY>' \
    --header 'Content-Type: application/json' \
    --data '{"search":"vehicles"}'
```
