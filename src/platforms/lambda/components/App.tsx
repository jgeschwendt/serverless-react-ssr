import * as React from 'react'
import { ApolloProvider } from 'react-apollo'
import { StaticRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import { StyleSheetManager, ThemeProvider } from 'styled-components'

export default ({ client, location, context, routes, sheet, theme }) => {
  return (
    <ApolloProvider client={client}>
      <StyleSheetManager sheet={sheet}>
        <ThemeProvider theme={theme}>
          <StaticRouter location={location} context={context}>
            {renderRoutes(routes)}
          </StaticRouter>
        </ThemeProvider>
      </StyleSheetManager>
    </ApolloProvider>
  )
}
