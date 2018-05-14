import * as React from 'react'
import { renderRoutes } from 'react-router-config'

export default (props: any) => (
  <main>{renderRoutes(props.route.routes)}</main>
)

export const One = () => (
  <div>One</div>
)

export const Two = () => (
  <div>Two</div>
)
