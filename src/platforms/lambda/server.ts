import render from './render'
import sitemap from './sitemap'

const server = async (event, context, callback) => {
  switch (event.path) {
    case '/sitemap.xml':
      callback(null, {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/xml',
          'Access-Control-Allow-Origin': '*'
        },
        body: await sitemap({ uri: process.env.API_DOMAIN_NAME })
      })
      return

    case '/robots.txt':
      callback(null, {
        body: process.env.STAGE === 'prod'
        ? 'User-agent: *\nDisallow:\nSitemap: https://' + process.env.APP_DOMAIN_NAME + '/sitemap.xml\n'
        : 'User-agent: *\nDisallow: /\n',
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        statusCode: 200
      })
      return

    default:
      const html = await render({ context, location: event.path })
      const body = `<!DOCTYPE html>${html}`

      callback(null, {
        body,
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Length': body.length,
          'Content-Type': 'text/html'
        }
      })
  }
}

export default (event, context, callback) => {
  server(event, context, callback)
    .catch(error => console.error('Error:\n\n', error, '\n\n'))
}
