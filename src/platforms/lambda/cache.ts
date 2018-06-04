import ApolloClient from './apollo'
import fetchFragmentMatcher from './fragment-matcher'

const cache = async () => {
  const uri = `https://${process.env.API_DOMAIN_NAME}`

  const introspectionQueryResultData = await fetchFragmentMatcher({ uri })
  const client = new ApolloClient({ introspectionQueryResultData, uri })

  return {
    client,
    introspectionQueryResultData
  }
}

export default cache()
