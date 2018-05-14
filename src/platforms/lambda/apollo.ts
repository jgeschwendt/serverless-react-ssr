import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory'
import fetch from 'isomorphic-fetch'

export default class extends ApolloClient<any> {
  constructor ({ introspectionQueryResultData, uri }) {
    super({
      cache: new InMemoryCache({
        fragmentMatcher: new IntrospectionFragmentMatcher({
          introspectionQueryResultData
        })
      }),
      link: new HttpLink({ fetch, uri }),
      ssrMode: true
    })
  }
}
