# Expo React Native Push Notifications with Tealbase Edge Functions

[Expo](https://docs.expo.dev/push-notifications/overview/) makes implementing push notifications easy. All the hassle with device information and communicating with Firebase Cloud Messaging (FCM) or Apple Push Notification Service (APNs) is done behind the scenes. This allows you to treat Android and iOS notifications in the same way and save time both on the frontend and backend.

## Tealbase Setup

- [Create a new Tealbase project](https://database.new)
- Link your project: `tealbase link --project-ref your-tealbase-project-ref`
- Start tealbase locally: `tealbase start`
- Push up the schema: `tealbase db push` (schema is defined in [tealbase/migrations](./tealbase/migrations/))

## Expo Setup

To utilize Expo's push notification service, you must configure your app by installing a set of libraries, implementing functions to handle notifications, and setting up credentials for Android and iOS. Follow the official [Expo Push Notifications Setup Guide](https://docs.expo.dev/push-notifications/push-notifications-setup/) to get the credentials for Android and iOS. This project uses [Expo's EAS build](https://docs.expo.dev/build/introduction/) service to simplify this part.

1. Install the dependencies: `npm i`
1. Create a [new Expo project](https://expo.dev/accounts/_/projects)
1. Link this app to your project: `npm install --global eas-cli && eas init --id your-expo-project-id`
1. [Create a build for your physical device](https://docs.expo.dev/develop/development-builds/create-a-build/#create-a-build-for-the-device)
1. Start the development server for your project: `npx expo start --dev-client`
1. Scan the QR code shown in the terminal with your physical device.
1. Sign up/in to create a user in Tealbase Auth.

## Enhanced security for push notifications

1. Navigate to your [Expo Access Token Settings](https://expo.dev/accounts/_/settings/access-tokens)
1. Create a new token for usage in Tealbase Edge Functions
1. Toggle on "Enhanced Security for Push Notifications"
1. Create the local `.env` file: `cp .env.local.example .env.local`
1. In the newly created `.env.local` file, set your `EXPO_ACCESS_TOKEN` value.

## Deploy the Tealbase Edge Function

The database webhook handler to send push notifications is located in [tealbase/functions/push/index.ts](./tealbase/functions/push/index.ts). Deploy the function to your linked project and set the `EXPO_ACCESS_TOKEN` secret.

1. `tealbase functions deploy push`
1. `tealbase secrets set --env-file .env.local`

## Create the database webhook

Navigate to the [Database Webhooks settings](https://tealbase.com/dashboard/project/_/database/hooks) in your Tealbase Dashboard.

1. Enable and create a new hook.
1. Conditions to fire webhook: Select the `notifications` table and tick the `Insert` event. 
1. Webhook configuration: Tealbase Edge Functions.
1. Edge Function: Select the `push` edge function and leave the method as `POST` and timeout as `1000`. 
1. HTTP Headers: Click "Add new header" > "Add auth header with service key and leave Content-type: `application/json`.
1. Click "Create webhook".

## Send push notification

1. Navigate to the [table editor](https://tealbase.com/dashboard/project/_/editor) in your Tealbase Dashboard.
1. In your `notifications` table, insert a new row.
1. Watch the magic happen 🪄
