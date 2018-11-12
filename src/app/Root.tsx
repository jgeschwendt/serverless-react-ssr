import * as React from 'react'
import styled from 'styled-components'
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
        <A to={'/'}>Home</A>
        <A to={'/page1'}>Page One</A>
        <A to={'/page2'}>Page Two</A>
      </Nav>
    </header>
    <main>{renderRoutes(props.route.routes)}</main>
  </div>
)
