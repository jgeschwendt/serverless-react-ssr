export default async (event, context, callback) => {
  callback(null, {
    body: process.env.STAGE === 'prod'
    ? 'User-agent: *\nDisallow:\nSitemap: https://' + process.env.APP_DOMAIN_NAME + '/sitemap.xml\n'
    : 'User-agent: *\nDisallow: /\n',
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    statusCode: 200
  })
}
