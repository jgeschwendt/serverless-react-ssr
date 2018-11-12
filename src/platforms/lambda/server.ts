import render from './render'
import robots from './middleware/robots'
import sitemap from './middleware/sitemap'

const server = async (event, context, callback) => {
  switch (event.path) {
    case '/sitemap.xml': await sitemap(event, context, callback); return
    case '/robots.txt': await robots(event, context, callback); return
    default:
      const html = await render({ location: event.path })
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
