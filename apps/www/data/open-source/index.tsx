import { products, PRODUCT_MODULES } from 'shared-data'

export default {
  metaTitle: 'Tealbase Open Source Community',
  metaDescription:
    'Tealbase is an open source company, actively fostering collaboration and supporting existing open source tools and communities.',
  heroSection: {
    title: 'The Power of Collaboration',
    h1: <span className="heading-gradient">Open Source Community</span>,
    subheader: (
      <>
        Tealbase is an open source company, actively fostering collaboration
        <br className="hidden md:inline" /> and supporting existing open source tools and
        communities.
      </>
    ),
  },
  repo_tabs: [
    {
      label: 'Database',
      icon: products.database.icon[16],
      repos: [
        'dbdev',
        'nix-postgres',
        'pljava',
        'pg_crdt',
        'pg_graphql',
        'pg_jsonschema',
        'pg_listen',
        'pg_net',
        'pg_netstat',
        'pgbouncer_exporter',
        'pgextkit',
        'pgx-contrib-spiext',
        'postgres',
        'postgres-deno',
        'postgres_lsp',
        'postgrest-dart',
        'postgrest-js',
        'postgres-meta',
        'postgres-wasm',
        'stripe-sync-engine',
        'teal_audit',
        'tealbase',
        'tealbase-dart',
        'tealbase-js',
        'tealbase-flutter',
        'tealbase-audit',
        'tealbase.dev',
        'tealutils',
        'tealvisor',
        'wal2json',
        'wrappers',
      ],
    },
    {
      label: 'Auth',
      icon: products.authentication.icon[16],
      repos: [
        'tealbase',
        'tealbase-cli',
        'tealbase-js',
        'auth-helpers',
        'auth-elements',
        'auth-ui',
        'gotrue',
        'gotrue-dart',
        'gotrue-js',
        'mailme',
      ],
    },
    {
      label: 'Storage',
      icon: products.storage.icon[16],
      repos: ['storage-api', 'tealbase', 'storage-js', 'storage-dart'],
    },
    {
      label: 'Edge Functions',
      icon: products.functions.icon[16],
      repos: [
        'deno-arm64',
        'edge-runtime',
        'tealbase',
        'postgres-deno',
        'self-hosted-edge-functions-demo',
        'functions-dart',
        'functions-js',
        'functions-relay',
        'tealbase',
        'tealbase-js',
      ],
    },
    {
      label: 'Realtime',
      icon: products.realtime.icon[16],
      repos: ['realtime', 'realtime-js', 'realtime-dart', 'tealbase', 'tealbase-js', 'walrus'],
    },
    {
      label: 'Vector',
      icon: PRODUCT_MODULES.vector.icon[16],
      repos: [
        'embeddings-generator',
        'headless-vector-search',
        'pgvector',
        'tealbase',
        'tealbase-js',
        'vecs',
      ],
    },
    {
      label: 'Other',
      repos: [
        'benchmarks',
        'cli',
        'cloudflare-access-grafana',
        'cmdk',
        // 'consul-template', #ARCHIVED
        'design-tokens',
        // 'examples-archive', # ARCHIVED
        'fly-admin',
        'fly-log-shipper',
        'fly-preview',
        'flyswatter',
        'grafana-agent-fly-example',
        'grafana-dashboards',
        'grid',
        'homebrew-tap',
        'imgproxy',
        'livebooks',
        'node-fetch',
        'og-image',
        'plrust',
        'pg_plan_filter',
        'prometheus-ecs-discovery',
        'react-data-grid',
        'rfcs',
        // 'remco', # ARCHIVED
        'setup-cli',
        'shared-types',
        'sql-formatter',
        'tealbase-action-example',
        'tests',
        'test-inspector',
        'test-reports',
        'tus-node-server',
        'ui',
        'valut',
        'workflows',
        // 'tealbase-ui-web', # DEPRECATED
        'yet-another-cloudwatch-exporter',
      ],
    },
  ],
  sponsorships: [
    {
      name: 'postgrest',
      description:
        'PostgREST is a standalone web server that turns your PostgreSQL database directly into a RESTful API.',
      full_name: '/PostgREST/postgrest',
      isGithub: true,
      url: 'https://github.com/PostgREST/postgrest',
    },
    {
      name: 'pgroonga',
      description:
        'PGroonga is a PostgreSQL extension to use Groonga as index. PGroonga makes PostgreSQL fast full text search platform for all languages!',
      full_name: '/pgroonga/pgroonga',
      isGithub: true,
      url: 'https://github.com/pgroonga/pgroonga',
    },
    {
      name: 'pgsodium',
      description: 'Modern cryptography for PostgreSQL using libsodium.',
      full_name: '/michelp/pgsodium',
      isGithub: true,
      url: 'https://github.com/michelp/pgsodium',
    },
    {
      name: 'Open Collective Profile',
      description: 'We have contributed with more than $250,000 on paying sponsorships.',
      url: 'https://opencollective.com/tealbase',
    },
    {
      name: 'OrioleDB',
      description: 'Sponsoring OrioleDB – the next generation storage engine for PostgreSQL',
      url: 'https://www.socallinuxexpo.org/sites/default/files/presentations/solving-postgres-wicked-problems.pdf',
    },
    {
      name: 'Elixir',
      description:
        'Elixir is a dynamic, functional language for building scalable and maintainable applications.',
      url: 'https://elixir-lang.org/blog/2022/10/05/my-future-with-elixir-set-theoretic-types/#:~:text=is%20sponsored%20by-,Tealbase,-(they%20are',
    },
  ],
}
