import { PageLayout } from '@commercetools-dpc/web-ui'
import Navigation from 'containers/ClientComponent/Navigation'
import { ProductsProvider } from 'containers/ClientComponent/contexts/ProductsContext'
import 'tailwindcss/tailwind.css'

export const metadata = {
  title: 'DPC Next RSC',
  description: 'DPC Turbo boilerplate for NextJS 13 with Server Components',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const bearerToken = String(process.env.COMMERCETOOLS_TOKEN)
  const url = `https://api.europe-west1.gcp.commercetools.com/myprojectkey/categories?limit=100`

  const result = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${bearerToken}`,
      'Content-Type': 'application/json',
    },
  })

  if (!result.ok)
    throw Error('Could not fetch categories.. Cause: ' + result.statusText)

  const data = await result.json()

  const categories = data.results
    .filter((d) => d.ancestors.length === 0)
    .map((d) => d.name.en)

  return (
    <html lang="en">
      <body>
        <ProductsProvider>
          <header>
            <Navigation categories={categories} />
          </header>
          <PageLayout>{children}</PageLayout>
        </ProductsProvider>
      </body>
    </html>
  )
}
