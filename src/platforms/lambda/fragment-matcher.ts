import fetch from 'isomorphic-fetch'

const query = `{
  __schema {
    types {
      kind
      name
      possibleTypes {
        name
      }
    }
  }
}`

// https://www.apollographql.com/docs/react/advanced/fragments.html
export default ({ uri }) => fetch(uri, {
  body: JSON.stringify({ query }),
  headers: {
    'Content-Type': 'application/json'
  },
  method: 'POST'
})
.then(result => result.json())
.then(result => {
  if (result && result.data && result.data.__schema && result.data.__schema.types) {
    // here we're filtering out any type information unrelated to unions or interfaces
    result.data.__schema.types = result.data.__schema.types.filter(
      type => type.possibleTypes !== null
    )
    return result.data
  }
  return null
})
