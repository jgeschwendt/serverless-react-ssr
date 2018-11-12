import loadable from '@loadable/component'
import * as React from 'react'

const Loadable = loadable(() => import('../../components/Loadable'))

export default () => (
  <div>
    <h2>Page 1</h2>
    <Loadable />
  </div>
)
