import * as React from 'react'
import { Provider } from 'react-redux'
import { ApolloProvider } from 'react-apollo'
import { renderRoutes } from 'react-router-config'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

export default ({ client, location, routes, store, theme }) => (
  <Provider store={store}>
    <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <BrowserRouter location={location}>
            {renderRoutes(routes)}
          </BrowserRouter>
        </ThemeProvider>
    </ApolloProvider>
  </Provider>
)
