import * as React from 'react'
import { renderToStringWithData } from 'react-apollo'
import { Helmet } from 'react-helmet'
import { ServerStyleSheet } from 'styled-components'

import App from './components/App'
import ApolloClient from './apollo'
import HTML from './document'
import fetchFragmentMatcher from './fragment-matcher'

import routes from '../../app/routes'
import theme from '../../app/theme'

// cache this response in the lambda container instance
const introspectionQueryPromise = fetchFragmentMatcher({ uri: process.env.API_DOMAIN_NAME })

export default async ({ context, location }) => {
  const introspectionQueryResultData = await introspectionQueryPromise

  // at some point see if purging the apollo cache is an option so this
  // object can be created on container startup / "lambda cache"
  const client = new ApolloClient({
    introspectionQueryResultData,
    uri: process.env.API_DOMAIN_NAME
  })

  const sheet = new ServerStyleSheet()
  const content = await renderToStringWithData(
    React.createElement(App, {
      client,
      context,
      location,
      routes,
      sheet: sheet.instance,
      theme
    })
  )

  const helmet = Helmet.renderStatic()
  const state = client.extract()

  return HTML({
    content,
    context,
    introspectionQueryResultData,
    helmet,
    sheet,
    state
  })
}
