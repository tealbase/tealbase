# Build a Tealbase Marketplace Integration

Tealbase offers an [OAuth2 connection flow](https://tealbase.com/docs/guides/platform/oauth-apps/authorize-an-oauth-app) and a [Management API](https://tealbase.com/docs/reference/api/introduction) allowing you to build Tealbase Marketplace Integrations that connect to our users' hosted Tealbase projects, making it more convenient than ever to create scalabale backends programmatically and tap into the extensive pool of Tealbase users.

## Setup

1. Follow the [steps in the docs](https://tealbase.com/docs/guides/platform/oauth-apps/publish-an-oauth-app) to create an OAuth App.
1. Set `TEAL_CONNECT_CLIENT_ID` and `TEAL_CONNECT_CLIENT_SECRET` in your `.env.local` file as shown in the [`.env.local.example` file](../../.env.local.example).

## Connect to Tealbase using OAuth2

This example showcases and end-to-end OAuth2 connection flow with [PKCE](https://tealbase.com/blog/tealbase-auth-sso-pkce#introducing-pkce), with the following steps:

1. Create authorization URL with PKCE codeVerifier.
1. Redirect user to Tealbase to authorize your application to connect to their Tealbase account.
1. User gets redirected to the callback route, where we exchange the code in the URL for `access_token` and `refresh_token`.
1. We use the `access_token` to retrieve a list of the user's projects using the [`tealbase-management-js` library](https://github.com/tealbase.community/tealbase-management-js).

## Run locally

```bash
tealbase functions serve connect-tealbase --no-verify-jwt --env-file ./tealbase/.env.local
```

Navigate to http://localhost:54321/functions/v1/connect-tealbase

## Deploy to Tealbase Edge Functions

```bash
tealbase functions deploy connect-tealbase --no-verify-jwt
tealbase secrets set --env-file ./tealbase/.env.local
```
