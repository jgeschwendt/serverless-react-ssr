import loadable from '@loadable/component'
import withTracker from './addons/withTracker'
import Main from './Root'

import Home from './containers/Home'
import Page1 from './containers/Page1'
import Page2 from './containers/Page2'

// const Home = loadable(() => import('./containers/Home'))
// const Page1 = loadable(() => import('./containers/Page1'))
// const Page2 = loadable(() => import('./containers/Page2'))

const routes = [{
  component: Main,
  routes: [
    {
      component: withTracker(Home),
      exact: true,
      path: '/'
    },
    {
      component: withTracker(Page1),
      exact: true,
      path: '/page1'
    },
    {
      component: withTracker(Page2),
      exact: true,
      path: '/page2'
    },
    {
      component: withTracker(Home),
      path: '/*'
    }
  ]
}]

export default routes
