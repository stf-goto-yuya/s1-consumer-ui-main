import Head from 'next/head'

interface Props {
  title?: string
  description?: string
  og?: {
    title?: string
    description?: string
    toppage?: boolean
    url?: string
    image?: string
  }
  noIndex?: boolean
  noFollow?: boolean
}

export const Meta: React.FC<Props> = ({
  title,
  description,
  og,
  noIndex,
  noFollow,
}) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>
          {process.env.SITE_NAME} {title ? `| ${title}` : ''}
        </title>
        <meta name="description" content={description ? description : '-'} />
        {og && (
          <>
            <meta property="og:title" content={og.title} />
            <meta property="og:description" content={og.description} />
            <meta
              property="og:type"
              content={og.toppage ? 'website' : 'article'}
            />
            <meta property="og:url" content={og.url} />
            <meta property="og:image" content={og.image} />
            <meta property="og:site_name" content={process.env.SITE_NAME} />
            <meta property="og:locale" content={process.env.LOCALE} />
          </>
        )}
        {noIndex && <meta name="robots" content="noindex" />}
        {noFollow && <meta name="robots" content="nofollow" />}
        {noIndex && noFollow && (
          <meta name="robots" content="noindex , nofollow" />
        )}
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  )
}
