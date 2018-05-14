import ApolloClient from './apollo'
import Hydrate from './hydrate'

import routes from '../../app/routes'
import theme from '../../app/theme'

Hydrate({
  client: new ApolloClient({ uri: process.env.APP_DOMAIN_NAME }),
  context: {},
  location: window.location.pathname,
  routes,
  theme
}, document.getElementById('root'))
