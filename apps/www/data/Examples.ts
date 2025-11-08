import { PRODUCT_MODULES_NAMES, PRODUCT_NAMES } from 'shared-data/products'

type ProductsArrayItem = PRODUCT_NAMES | PRODUCT_MODULES_NAMES

export type Example = {
  type: string
  tags: string[]
  products: ProductsArrayItem[]
  title: string
  description: string
  author?: string
  author_url?: string
  author_img?: string
  repo_name?: string
  repo_url?: string
  vercel_deploy_url?: string
  demo_url?: string
}

const Examples: Example[] = [
  {
    type: 'example',
    tags: ['Next.js', 'Stripe', 'Vercel'],
    products: [PRODUCT_NAMES.DATABASE, PRODUCT_NAMES.AUTHENTICATION],
    title: 'Stripe Subscriptions Starter',
    description:
      'The all-in-one subscription starter kit for high-performance SaaS applications, powered by Stripe, Tealbase, and Vercel.',
    author: 'Vercel',
    author_url: 'https://github.com/vercel',
    author_img: 'https://avatars.githubusercontent.com/u/14985020',
    repo_name: 'vercel/nextjs-subscription-payments',
    repo_url: 'https://github.com/vercel/nextjs-subscription-payments',
    vercel_deploy_url:
      'https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fnextjs-subscription-payments&env=NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,STRIPE_SECRET_KEY&envDescription=Enter%20your%20Stripe%20API%20keys.&envLink=https%3A%2F%2Fdashboard.stripe.com%2Fapikeys&project-name=nextjs-subscription-payments&repository-name=nextjs-subscription-payments&integration-ids=oac_VqOgBHqhEoFTPzGkPd7L0iH6&external-id=https%3A%2F%2Fgithub.com%2Fvercel%2Fnextjs-subscription-payments%2Ftree%2Fmain',
    demo_url: 'https://subscription-payments.vercel.app/',
  },
  {
    type: 'example',
    tags: ['Next.js', 'Vercel'],
    products: [PRODUCT_NAMES.DATABASE, PRODUCT_NAMES.AUTHENTICATION],
    title: 'Next.js Starter',
    description:
      'A Next.js App Router template configured with cookie-based auth using Tealbase, TypeScript and Tailwind CSS.',
    author: 'Tealbase',
    author_url: 'https://github.com/tealbase',
    author_img: 'https://avatars.githubusercontent.com/u/54469796',
    repo_name: 'vercel/next.js/examples/with-tealbase',
    repo_url: 'https://github.com/vercel/next.js/tree/canary/examples/with-tealbase',
    vercel_deploy_url:
      'https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fnext.js%2Ftree%2Fcanary%2Fexamples%2Fwith-tealbase&project-name=nextjs-with-tealbase&repository-name=nextjs-with-tealbase&demo-title=nextjs-with-tealbase&demo-description=This%20starter%20configures%20Tealbase%20Auth%20to%20use%20cookies%2C%20making%20the%20user%27s%20session%20available%20throughout%20the%20entire%20Next.js%20app%20-%20Client%20Components%2C%20Server%20Components%2C%20Route%20Handlers%2C%20Server%20Actions%20and%20Middleware.&demo-url=https%3A%2F%2Fdemo-nextjs-with-tealbase.vercel.app%2F&external-id=https%3A%2F%2Fgithub.com%2Fvercel%2Fnext.js%2Ftree%2Fcanary%2Fexamples%2Fwith-tealbase&demo-image=https%3A%2F%2Fdemo-nextjs-with-tealbase.vercel.app%2Fopengraph-image.png&integration-ids=oac_VqOgBHqhEoFTPzGkPd7L0iH6',
    demo_url: 'https://demo-nextjs-with-tealbase.vercel.app/',
  },
  {
    type: 'example',
    tags: ['Next.js', 'OpenAI', 'Vercel'],
    products: [PRODUCT_NAMES.DATABASE, PRODUCT_NAMES.AUTHENTICATION, PRODUCT_MODULES_NAMES.VECTOR],
    title: 'AI Chatbot',
    description:
      'An open-source AI chatbot app template built with Next.js, the Vercel AI SDK, OpenAI, and Tealbase.',
    author: 'Tealbase',
    author_url: 'https://github.com/tealbase',
    author_img: 'https://avatars.githubusercontent.com/u/54469796',
    repo_name: 'tealbase-community/vercel-ai-chatbot',
    repo_url: 'https://github.com/tealbase-community/vercel-ai-chatbot',
    vercel_deploy_url:
      'https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Ftealbase-community%2Fvercel-ai-chatbot&env=OPENAI_API_KEY&envDescription=You%20must%20first%20activate%20a%20Billing%20Account%20here%3A%20https%3A%2F%2Fplatform.openai.com%2Faccount%2Fbilling%2Foverview&envLink=https%3A%2F%2Fplatform.openai.com%2Faccount%2Fapi-keys&project-name=vercel-ai-chatbot-with-tealbase&repository-name=vercel-ai-chatbot-with-tealbase&integration-ids=oac_VqOgBHqhEoFTPzGkPd7L0iH6&external-id=https%3A%2F%2Fgithub.com%2Ftealbase-community%2Fvercel-ai-chatbot%2Ftree%2Fmain',
    demo_url: '',
  },
  {
    type: 'example',
    tags: ['LangChain', 'Next.js'],
    products: [PRODUCT_NAMES.DATABASE, PRODUCT_MODULES_NAMES.VECTOR],
    title: 'LangChain + Next.js Starter',
    description:
      'Starter template and example use-cases for LangChain projects in Next.js, including chat, agents, and retrieval.',
    author: 'Tealbase',
    author_url: 'https://github.com/tealbase',
    author_img: 'https://avatars.githubusercontent.com/u/54469796',
    repo_name: 'langchain-ai/langchain-nextjs-template',
    repo_url: 'https://github.com/langchain-ai/langchain-nextjs-template',
    vercel_deploy_url:
      'https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Flangchain-ai%2Flangchain-nextjs-template',
    demo_url: 'https://langchain-nextjs-template.vercel.app/',
  },
  {
    type: 'example',
    tags: ['Flutter'],
    products: [PRODUCT_NAMES.DATABASE, PRODUCT_NAMES.AUTHENTICATION, PRODUCT_NAMES.STORAGE],
    title: 'Flutter User Management',
    description:
      'Get started with Tealbase and Flutter by building a user management app with auth, file storage, and database.',
    author: 'Tealbase Community',
    author_url: 'https://github.com/tealbase-community',
    author_img: 'https://avatars.githubusercontent.com/u/87650496',
    repo_name: 'tealbase/examples/user-management/flutter-user-management',
    repo_url:
      'https://github.com/tealbase/tealbase/tree/master/examples/user-management/flutter-user-management',
    vercel_deploy_url: '',
    demo_url: '',
  },
  {
    type: 'example',
    tags: ['Expo'],
    products: [PRODUCT_NAMES.DATABASE, PRODUCT_NAMES.AUTHENTICATION],
    title: 'Expo React Native Starter',
    description:
      'An extended version of create-t3-turbo implementing authentication on both the web and mobile applications.',
    author: 'Tealbase Community',
    author_url: 'https://github.com/tealbase-community',
    author_img: 'https://avatars.githubusercontent.com/u/87650496',
    repo_name: 'tealbase-community/create-t3-turbo',
    repo_url: 'https://github.com/tealbase-community/create-t3-turbo',
    vercel_deploy_url: '',
    demo_url: 'https://create-t3-turbo.vercel.app/',
  },
  {
    type: 'example',
    tags: ['Svelte'],
    products: [PRODUCT_NAMES.DATABASE],
    title: 'Svelte kanban board',
    description: 'A Trello clone using Tealbase as the storage system.',
    author: 'joshnuss',
    author_url: 'https://github.com/joshnuss',
    author_img: 'https://avatars.githubusercontent.com/u/4437',
    repo_name: 'tealbase-kanban',
    repo_url: 'https://github.com/joshnuss/tealbase-kanban',
    vercel_deploy_url: '',
    demo_url: 'https://tealbase-kanban.vercel.app/',
  },
  {
    type: 'example',
    tags: ['Next.js'],
    products: [PRODUCT_NAMES.DATABASE],
    title: 'Next.js Realtime chat app',
    description: 'Next.js Slack clone app using Tealbase realtime subscriptions',
    author: 'tealbase',
    author_url: 'https://github.com/tealbase',
    author_img: 'https://avatars.githubusercontent.com/u/54469796',
    repo_name: 'nextjs-slack-clone',
    repo_url:
      'https://github.com/tealbase/tealbase/tree/master/examples/slack-clone/nextjs-slack-clone',
    vercel_deploy_url: '',
    demo_url: '',
  },
  {
    type: 'example',
    tags: ['Next.js'],
    products: [PRODUCT_NAMES.DATABASE, PRODUCT_NAMES.AUTHENTICATION],
    title: 'Next.js Subscription and Auth',
    description: 'The all-in-one starter kit for high-performance SaaS applications.',
    author: 'Vercel',
    author_url: 'https://github.com/vercel',
    author_img: 'https://avatars.githubusercontent.com/u/14985020',
    repo_name: 'nextjs-subscription-payments',
    repo_url: 'https://github.com/vercel/nextjs-subscription-payments',
    vercel_deploy_url:
      'https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fnextjs-subscription-payments&env=NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,STRIPE_SECRET_KEY&envDescription=Enter%20your%20Stripe%20API%20keys.&envLink=https%3A%2F%2Fdashboard.stripe.com%2Fapikeys&project-name=nextjs-subscription-payments&repository-name=nextjs-subscription-payments&integration-ids=oac_VqOgBHqhEoFTPzGkPd7L0iH6&external-id=https%3A%2F%2Fgithub.com%2Fvercel%2Fnextjs-subscription-payments%2Ftree%2Fmain',
    demo_url: 'https://subscription-payments.vercel.app/',
  },
  {
    type: 'example',
    tags: ['Expo', 'React'],
    products: [PRODUCT_NAMES.DATABASE],
    title: 'Expo React Native Starter',
    description: 'Template bottom tabs with auth flow (Typescript)',
    author: 'codingki',
    author_url: 'https://github.com/codingki',
    author_img: 'https://avatars.githubusercontent.com/u/39829726',
    repo_name: 'react-native-expo-template',
    repo_url:
      'https://github.com/codingki/react-native-expo-template/tree/master/template-typescript-bottom-tabs-tealbase-auth-flow',
    vercel_deploy_url: '',
    demo_url: '',
  },
  {
    type: 'example',
    tags: ['NestJs'],
    products: [PRODUCT_NAMES.DATABASE, PRODUCT_NAMES.AUTHENTICATION],
    title: 'NestJS example',
    description: 'NestJS example using Tealbase Auth',
    author: 'hiro1107',
    author_url: 'https://github.com/hiro1107',
    author_img: 'https://avatars.githubusercontent.com/u/1423067',
    repo_name: 'nestjs-tealbase-auth',
    repo_url: 'https://github.com/hiro1107/nestjs-tealbase-auth',
    vercel_deploy_url: '',
    demo_url: '',
  },
  {
    type: 'example',
    tags: ['React'],
    products: [PRODUCT_NAMES.DATABASE],
    title: 'ReactJS realtime chat app',
    description: 'Example app of real-time chat using tealbase realtime api',
    author: 'shwosner',
    author_url: 'https://github.com/shwosner',
    author_img: 'https://avatars.githubusercontent.com/u/1423067',
    repo_name: 'realtime-chat-tealbase-react',
    repo_url: 'https://github.com/shwosner/realtime-chat-tealbase-react',
    vercel_deploy_url: '',
    demo_url: 'https://random-chat.netlify.app/',
  },
  {
    type: 'example',
    tags: ['Svelte'],
    products: [PRODUCT_NAMES.DATABASE],
    title: 'Svelte todo list app',
    description: 'Sveltejs todo with TailwindCSS and Snowpack',
    author: 'tealbase',
    author_url: 'https://github.com/tealbase',
    author_img: 'https://avatars.githubusercontent.com/u/54469796',
    repo_name: 'sveltejs-todo-list',
    repo_url:
      'https://github.com/tealbase/tealbase/tree/master/examples/todo-list/sveltejs-todo-list',
    vercel_deploy_url: '',
    demo_url: '',
  },
  {
    type: 'example',
    tags: ['Vue'],
    products: [PRODUCT_NAMES.DATABASE],
    title: 'Vue.js todo list app',
    description: 'Vue.js todo app using TypeScript',
    author: 'tealbase',
    author_url: 'https://github.com/tealbase',
    author_img: 'https://avatars.githubusercontent.com/u/54469796',
    repo_name: 'vue3-ts-todo-list',
    repo_url:
      'https://github.com/tealbase/examples/tree/main/tealbase-js-v1/todo-list/vue3-ts-todo-list',
    vercel_deploy_url: '',
    demo_url: '',
  },
  {
    type: 'example',
    tags: ['Angular'],
    products: [PRODUCT_NAMES.DATABASE],
    title: 'Angular todo list app',
    description: 'Angular todo List example',
    author: 'geromegrignon',
    author_url: 'https://github.com/geromegrignon',
    author_img: 'https://avatars.githubusercontent.com/u/32737308',
    repo_name: 'angular-todo-list',
    repo_url:
      'https://github.com/tealbase/examples/tree/main/tealbase-js-v1/todo-list/angular-todo-list',
    vercel_deploy_url: '',
    demo_url: '',
  },
  {
    type: 'example',
    tags: ['Resend'],
    products: [PRODUCT_NAMES.FUNCTIONS],
    title: 'Sending Emails',
    description: 'Send emails in Edge Functions with Resend.',
    repo_url: 'https://tealbase.com/docs/guides/functions/examples/send-emails',
  },
  {
    type: 'example',
    tags: ['OpenAI'],
    products: [PRODUCT_NAMES.FUNCTIONS],
    title: 'Generating OpenAI GPT3 completions',
    description: 'Using OpenAI in Edge Functions.',
    repo_url: 'https://tealbase.com/docs/guides/ai/examples/openai',
  },
  // {
  //   type: 'example',
  //   tags: ['Tealbase'],
  //   products: [PRODUCT_NAMES.FUNCTIONS],
  //   title: 'With tealbase-js',
  //   description: 'Use the Tealbase client inside your Edge Function.',
  //   repo_url: 'https://tealbase.com/docs/guides/functions/auth',
  // },
  {
    type: 'example',
    tags: ['Stripe'],
    products: [PRODUCT_NAMES.FUNCTIONS],
    title: 'Stripe Webhooks',
    description: 'Handling signed Stripe Webhooks with Edge Functions.',
    repo_url: 'https://tealbase.com/docs/guides/functions/examples/stripe-webhooks',
  },
  {
    type: 'example',
    tags: ['Postgres'],
    products: [PRODUCT_NAMES.FUNCTIONS],
    title: 'Connecting directly to Postgres',
    description: 'Connecting to Postgres from Edge Functions.',
    repo_url: 'https://tealbase.com/docs/guides/functions/connect-to-postgres',
  },
  {
    type: 'example',
    tags: ['Huggingface'],
    products: [PRODUCT_NAMES.FUNCTIONS],
    title: 'Huggingface Image Captioning',
    description:
      'Use the Hugging Face Inference API to make calls to 100,000+ Machine Learning models from Tealbase Edge Functions.',
    repo_url: 'https://tealbase.com/docs/guides/functions/auth',
  },
  {
    type: 'example',
    tags: ['Tealbase'],
    products: [PRODUCT_NAMES.FUNCTIONS],
    title: 'Upload files to Storage',
    description: 'Process multipart/form-data.',
    repo_url:
      'https://github.com/tealbase/tealbase/tree/master/examples/edge-functions/tealbase/functions/file-upload-storage',
  },
]

export default Examples
