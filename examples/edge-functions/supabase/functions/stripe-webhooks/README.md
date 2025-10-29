# stripe-webhooks

Also check out our full Stripe Payments examples for [React Native (Expo)](https://github.com/tealbase.community/expo-stripe-payments-with-tealbase-functions) and [Flutter](https://github.com/tealbase.community/flutter-stripe-payments-with-tealbase-functions).

## Setup env vars

- `cp tealbase/.env.local.example tealbase/.env.local`

## Test locally

- Terminal 1:
  - `tealbase functions serve --no-verify-jwt --env-file ./tealbase/.env.local`
- Terminal 2:
  - `stripe listen --forward-to localhost:54321/functions/v1/`
- Terminal 3 (optional):
  - `stripe trigger payment_intent.succeeded`

## Deploy

- `tealbase functions deploy --no-verify-jwt stripe-webhooks`
- `tealbase secrets set --env-file ./tealbase/.env.local`
