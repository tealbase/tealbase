# send-email-smtp

## Deploy

```
tealbase link --project-ref your-project-ref
tealbase secrets set SMTP_HOSTNAME="your.hostname.com" SMTP_PORT="2587" SMTP_USERNAME="your_username" SMTP_PASSWORD="your_password" SMTP_FROM="no-reply@example.com"
tealbase functions deploy send-email-smtp
```

Note: `SMTP_PORT` must be a port other than `25` and `587` as Deno Deploy does not support outgoing connections to ports. AWS SES (port 2587) is recommended.

## Test locally

- `cp ./tealbase/.env.local.example ./tealbase/.env.local`
- `tealbase functions serve --env-file ./tealbase/.env.local`
