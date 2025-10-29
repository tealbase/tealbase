# GitHub Actions Deploy

This example includes a [deploy GitHub Action](./../../../.github/workflows/deploy.yaml) that automatically deploys your Tealbase Edge Functions when pushing to or merging into the main branch.

You can use the [`setup-cli` GitHub Action](https://github.com/marketplace/actions/tealbase-cli-action) to run Tealbase CLI commands in your GitHub Actions, for example to deploy a Tealbase Edge Function:

```yaml
name: Deploy Function

on:
  push:
    branches:
      - main
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest

    env:
      TEALBASE_ACCESS_TOKEN: ${{ secrets.TEALBASE_ACCESS_TOKEN }}
      PROJECT_ID: zdtdtxajzydjqzuktnqx

    steps:
      - uses: actions/checkout@v3

      - uses: tealbase/setup-cli@v1
        with:
          version: latest

      - run: tealbase functions deploy github-action-deploy --project-ref $PROJECT_ID
```
