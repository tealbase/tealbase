# Open Graph (OG) Image Generation with Tealbase Storage CDN Caching

Generate Open Graph images with Deno and Tealbase Edge Functions and cache the generated image with Tealbase Storage CDN.

- Docs: https://deno.land/x/og_edge@0.0.2
- Examples: https://vercel.com/docs/concepts/functions/edge-functions/og-image-examples
- Demo: https://obuldanrptloktxcffvn.tealbase.co/functions/v1/lw11-og?username=<username>

## Run locally

```bash
tealbase start
tealbase functions serve lw11-og --no-verify-jwt --env-file ./tealbase/.env.local
```

Navigate to http://localhost:54321/functions/v1/lw11-og?username=<username>

## Deploy

```bash
tealbase functions deploy lw11-og --no-verify-jwt
```
