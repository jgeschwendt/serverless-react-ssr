import * as React from 'react'
import { hydrate } from 'react-dom'

import App from './components/App'

export default ({
  client,
  context = {},
  location = '/',
  routes,
  theme
}, element) => {
  hydrate(React.createElement(App, {
    client,
    context,
    location,
    routes,
    theme
  }), element)
}
