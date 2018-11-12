import { ChunkExtractorManager } from '@loadable/server'
import * as React from 'react'
import { ApolloProvider } from 'react-apollo'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import { StyleSheetManager, ThemeProvider } from 'styled-components'

export default ({
  client,
  extractor,
  location,
  routes,
  sheet,
  store,
  theme
}) => {
  return (
    <ChunkExtractorManager extractor={extractor}>
      <Provider store={store}>
        <ApolloProvider client={client}>
          <StyleSheetManager sheet={sheet}>
            <ThemeProvider theme={theme}>
              <StaticRouter location={location}>
                {renderRoutes(routes)}
              </StaticRouter>
            </ThemeProvider>
          </StyleSheetManager>
        </ApolloProvider>
      </Provider>
    </ChunkExtractorManager>
  )
}
