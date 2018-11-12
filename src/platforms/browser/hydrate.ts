import { loadableReady } from '@loadable/component'
import { createElement } from 'react'
import { hydrate } from 'react-dom'
import { compose, createStore } from 'redux'

import ApolloClient from './apollo'

import reducer from '../../app/reducer'
import routes from '../../app/routes'
import theme from '../../app/theme'

import App from './components/App'

const store = createStore(reducer , window.__REDUX_STATE__, (window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose)())

export default (element, context = {}) => {
  loadableReady(() => {
    hydrate(createElement(App, {
      client: new ApolloClient({ uri: `https:${process.env.API_DOMAIN_NAME}` }),
      context,
      location: window.location.pathname || '/',
      routes,
      store,
      theme
    }), element)
  })
}
