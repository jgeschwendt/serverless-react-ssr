import gql from 'graphql-tag'
import * as React from 'react'
import { graphql } from 'react-apollo'

export default graphql(gql`
  query Feed {
    feed {
      author {
        name
      }
      title
      text
    }
  }
`)(props => (
  <div>
    <h2>Page 2</h2>
    <pre>{JSON.stringify(props, null, 2)}</pre>
  </div>
))
