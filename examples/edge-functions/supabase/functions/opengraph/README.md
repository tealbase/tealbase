# Open Graph Image Generation

Generate Open Graph images with Deno and Tealbase Edge Functions, no framework needed. This is a fork of the awesome [@vercel/og](https://www.npmjs.com/package/@vercel/og), ported to run on Deno.

- Docs: https://deno.land/x/og_edge@0.0.2

## Run locally

```bash
tealbase functions serve --no-verify-jwt
```

Navigate to http://localhost:54321/functions/v1/opengraph

## Deploy

```bash
tealbase functions deploy opengraph --no-verify-jwt
```
