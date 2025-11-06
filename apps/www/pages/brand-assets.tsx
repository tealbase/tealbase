import Container from 'components/Container'

import CTABanner from 'components/CTABanner/index'
import { Button } from 'ui'
import Layout from '~/components/Layouts/Default'

import { useRouter } from 'next/router'

import * as supabaseLogoPreview from 'common/assets/images/logo-preview.jpg'
import { Download } from 'lucide-react'
import { NextSeo } from 'next-seo'
import Image from 'next/image'
import SectionContainer from '~/components/Layouts/SectionContainer'

const Index = () => {
  // base path for images
  const router = useRouter()

  const meta_title = 'Branding | Tealbase'
  const meta_description = 'Get Tealbase Brand assets here.'

  return (
    <>
      <NextSeo
        title={meta_title}
        description={meta_description}
        openGraph={{
          title: meta_title,
          description: meta_description,
          url: `https://tealbase.com/${router.pathname}`,
          images: [
            {
              url: `https://tealbase.com/images/og/supabase-og.png`,
            },
          ],
        }}
      />
      <Layout>
        <Container>
          <SectionContainer className="pb-0 md:pb-0 lg:pb-0">
            <div className="max-w-xl">
              <h1 className="text-foreground text-5xl">Brand assets</h1>
              <p className="text-foreground text-2xl">Download official Tealbase logos</p>
              <p className="text-foreground text-sm">
                All Tealbase trademarks, logos, or other brand elements can never be modified or
                used for any other purpose other than to represent Tealbase Inc.
              </p>
            </div>
          </SectionContainer>
          <SectionContainer>
            <div className="shadow-small grid grid-cols-12 rounded-lg border border-default">
              <div className="relative col-span-12 h-60 w-full overflow-auto rounded-lg lg:col-span-5">
                <Image
                  src={supabaseLogoPreview}
                  alt="Tealbase logo Preview"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="col-span-12 flex items-center lg:col-span-7">
                <div className="p-16">
                  <div className="space-y-2">
                    <h1 className="text-foreground text-4xl">Tealbase logos</h1>
                    <p className="text-foreground-light text-sm">
                      <p>
                        Download Tealbase official logos, including as SVG's, in both light and dark
                        theme.
                      </p>
                      <p>Do not use any other color for the wordmark.</p>
                    </p>
                    <form method="get" action={`/brand-assets.zip`}>
                      <Button htmlType="submit" type="default" iconRight={<Download />}>
                        Download logo kit
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </SectionContainer>
          <SectionContainer className="sm:pt-0 md:pt-0 lg:pt-0 xl:pt-0">
            <div className="shadow-small grid grid-cols-12 rounded-lg border border-default">
              <div className="relative col-span-12 h-60 w-full overflow-auto rounded-lg lg:col-span-5 flex items-center justify-center">
                <Image
                  src="https://obuldanrptloktxcffvn.supabase.co/storage/v1/object/public/supabase-brand-assets/connect-supabase/connect-supabase-dark.svg"
                  alt="Connect Tealbase Button"
                  width={154}
                  height={31}
                />
              </div>
              <div className="col-span-12 flex items-center lg:col-span-7">
                <div className="p-16">
                  <div className="space-y-2">
                    <h1 className="text-foreground text-4xl">Tealbase Integrations</h1>
                    <p className="text-foreground-light text-sm">
                      <p>
                        When building a{' '}
                        <a
                          className="underline"
                          href="/docs/guides/platform/oauth-apps/build-a-supabase-integration"
                        >
                          Tealbase Integration
                        </a>
                        , use this "Connect Tealbase" button to initiate the OAuth redirect.
                      </p>
                      <p>Do not use any other color for the wordmark.</p>
                    </p>
                    <form
                      method="get"
                      action={`https://obuldanrptloktxcffvn.supabase.co/storage/v1/object/public/supabase-brand-assets/connect-supabase/connect-supabase.zip`}
                    >
                      <Button htmlType="submit" type="default" iconRight={<Download />}>
                        Download button kit
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </SectionContainer>
          <CTABanner />
        </Container>
      </Layout>
    </>
  )
}

export default Index
