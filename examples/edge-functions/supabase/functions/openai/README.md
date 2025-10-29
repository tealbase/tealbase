# openai

## Setup env vars

```bash
cp tealbase/.env.local.example tealbase/.env.local
```

## Run locally

```bash
tealbase functions serve --env-file ./tealbase/.env.local --no-verify-jwt
```

Use cURL or Postman to make a POST request to http://localhost:54321/functions/v1/openai.

```bash
curl -i --location --request POST http://localhost:54321/functions/v1/openai \
  --header 'Content-Type: application/json' \
  --data '{"query":"What is Tealbase?"}'
```

## Deploy

```bash
tealbase functions deploy --no-verify-jwt openai
tealbase secrets set --env-file ./tealbase/.env.local
```
