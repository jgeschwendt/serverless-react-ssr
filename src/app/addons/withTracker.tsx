import * as React from 'react'
// import * as ReactGA from 'react-ga'

// ReactGA.initialize(process.env.GOOGLE_ANALYTICS_TRACKING_ID)

export default (Component, options = {}) => {
  const trackPage = page => {
    console.log('[TRACKING] ', page)
    // ReactGA.set({ page, ...options })
    // ReactGA.pageview(page)
  }

  return class extends React.Component<any, any> {
    componentDidMount () {
      const { pathname, search, hash } = this.props.location
      trackPage(`${pathname}${search}${hash}`)
    }

    componentWillReceiveProps (nextProps) {
      const currentPage = this.props.location.pathname
      const nextPage = nextProps.location.pathname

      if (currentPage !== nextPage) {
        trackPage(nextPage)
      }
    }

    render () {
      return <Component {...this.props} />
    }
  }
}
