import withTracker from './addons/withTracker'
import Main, { One, Two } from './Root'

const routes = [{
  component: Main,
  routes: [
    {
      component: withTracker(One),
      exact: true,
      path: '/'
    },
    {
      component: withTracker(Two),
      path: '/*'
    }
  ]
}]

export default routes
