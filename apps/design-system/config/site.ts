export const siteConfig = {
  name: 'Tealbase Design System',
  url: 'https://tealbase.com/design-system',
  ogImage: 'https://tealbase.com/design-system/og.jpg',
  description: 'Design System of Tealbase',
  links: {
    twitter: 'https://twitter.com/tealbase',
    github: 'https://github.com/tealbase/tealbase/tree/master/apps/design-system',
    credits: {
      radix: 'https://www.radix-ui.com/themes/docs/overview/getting-started',
      shadcn: 'https://ui.shadcn.com/',
      geist: 'https://vercel.com/geist/introduction',
    },
  },
}

export type SiteConfig = typeof siteConfig
