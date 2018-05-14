import gql from 'graphql-tag'
import * as sitemap from 'sitemap'

export default (hostname) => new Promise((resolve, reject) => {
  const mapping = sitemap.createSitemap({
    cacheTime: 600000,
    hostname,
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
