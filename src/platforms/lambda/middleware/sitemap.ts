import * as sitemap from 'sitemap'

const sitemapDocument = async () => new Promise((resolve, reject) => {
  const mapping = sitemap.createSitemap({
    cacheTime: 600000,
    hostname: process.env.API_DOMAIN_NAME,
    urls: [
      { url: '/' }
    ]
  })

  mapping.toXML((error, xml) => {
    if (error) {
      reject(error)
    } else {
      resolve(xml)
    }
  })
})

export default async (event, context, callback) => {
  callback(null, {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Access-Control-Allow-Origin': '*'
    },
    body: await sitemapDocument()
  })
}
