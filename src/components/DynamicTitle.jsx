import React from 'react'
import { Helmet } from 'react-helmet-async'
import { couple, prenupImages } from '../data'

const OG_IMAGE_PATH = prenupImages.ogImage
const FAVICON_PATH = prenupImages.favicon

const DynamicTitle = () => {
  const weddingDate = new Date(couple.wedding.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  const ogImageAbsolute = origin ? `${origin}${OG_IMAGE_PATH}` : OG_IMAGE_PATH

  const title = `You Are Invited to the Wedding of ${couple.together}`
  const description = `Join us for ${couple.together}'s wedding on ${weddingDate}.`

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" type="image/jpeg" href={FAVICON_PATH} />
      <link rel="apple-touch-icon" href={FAVICON_PATH} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImageAbsolute} />
      <meta property="og:image:secure_url" content={ogImageAbsolute} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:alt" content={couple.together.replace('&', 'and')} />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImageAbsolute} />
      <meta name="twitter:image:alt" content={couple.together.replace('&', 'and')} />
    </Helmet>
  )
}

export default DynamicTitle 