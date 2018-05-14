import * as React from 'react'
import { ApolloProvider } from 'react-apollo'
import { renderRoutes } from 'react-router-config'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

export default ({ client, context, location, routes, theme }) => (
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <BrowserRouter location={location} context={context}>
        {renderRoutes(routes)}
      </BrowserRouter>
    </ThemeProvider>
  </ApolloProvider>
)
