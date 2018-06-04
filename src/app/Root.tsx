import * as React from 'react'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { renderRoutes } from 'react-router-config'
import { Link } from 'react-router-dom'

const Nav = styled.nav`
  border: 1px solid #ddd;
  display: block;
  padding: 1rem;
`

const A = styled(Link)`
  color: blue;
  display: inline-block;
  padding: 1rem;
  text-decoration: none;
`

export default (props: any) => (
  <div>
    <header>
      <Nav>
        <A to={'/'}>One</A>
        <A to={'/anything'}>Two</A>
      </Nav>
    </header>
    <main>{renderRoutes(props.route.routes)}</main>
  </div>
)

const DehydratedOne = ({ className, ...props }) => (
  <div className={className}>
    <h1>One</h1>
    <pre>{JSON.stringify(props, null, 2)}</pre>
  </div>
)

const StyledOne: any = styled(DehydratedOne)`
  border: 2px solid #ddd;
  margin: 1rem;
  padding: 1rem;
`

const One = graphql(gql`
  query Feed {
    feed {
      author {
        name
      }
      title
      text
    }
  }
`)(StyledOne)

const Two = () => (
  <div>Two</div>
)

export { One, Two }
