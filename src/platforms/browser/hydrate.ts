import { loadComponents } from 'loadable-components'
import { createElement } from 'react'
import { hydrate } from 'react-dom'
import { compose, createStore } from 'redux'

import ApolloClient from './apollo'
import Hydrate from './hydrate'

import reducer from '../../app/reducer'
import routes from '../../app/routes'
import theme from '../../app/theme'

import App from './components/App'

export default (element, context = {}) => {
  loadComponents().then(() => {
    hydrate(createElement(App, {
      client: new ApolloClient({ uri: `https:${process.env.API_DOMAIN_NAME}` }),
      context,
      location: window.location.pathname || '/',
      routes,
      store: createStore(reducer , window.__REDUX_STATE__, (window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose)()),
      theme
    }), element)
  })
}
