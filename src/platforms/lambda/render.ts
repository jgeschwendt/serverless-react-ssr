import { ChunkExtractor } from '@loadable/server'
import { resolve } from 'path'
import { createElement } from 'react'
import { renderToStringWithData } from 'react-apollo'
import { Helmet } from 'react-helmet'
import { createStore } from 'redux'
import { ServerStyleSheet } from 'styled-components'

import LambdaContainerCache from './cache'

import App from './components/App'
import HTML from './document'

import reducer from '../../app/reducer'
import routes from '../../app/routes'
import theme from '../../app/theme'

export default async ({ location }) => {
  const { client, introspectionQueryResultData } = await LambdaContainerCache
  const statsFile = process.env.IS_OFFLINE
    ? resolve('.webpack/service/loadable-stats.json')
    : resolve('loadable-stats.json')
  const store = createStore(reducer)
  await client.resetStore() // the cache persists between lambda requests

  const extractor = new ChunkExtractor({ entrypoints: [], statsFile })
  const sheet = new ServerStyleSheet()

  const content = await renderToStringWithData(
    createElement(App, {
      client,
      extractor,
      location,
      routes,
      sheet: sheet.instance,
      store,
      theme
    })
  )

  const helmet = Helmet.renderStatic()
  const state = client.extract()

  return HTML({
    content,
    extractor,
    introspectionQueryResultData,
    helmet,
    sheet,
    state,
    store
  })
}
