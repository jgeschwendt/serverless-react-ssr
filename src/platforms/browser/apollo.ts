import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory'
import fetch from 'isomorphic-fetch'

export default class extends ApolloClient<any> {
  constructor ({ uri }) {
    super({
      cache: new InMemoryCache({
        fragmentMatcher: new IntrospectionFragmentMatcher({
          introspectionQueryResultData: window.__APOLLO_FRAGS__
        })
      }).restore(window.__APOLLO_STATE__),
      link: new HttpLink({ fetch, uri }),
      ssrForceFetchDelay: 100,
      connectToDevTools: true
    })
  }
}
