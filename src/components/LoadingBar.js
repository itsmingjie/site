import React from 'react'
import { Box, Loading } from '@hackclub/design-system'

const Base = Box.extend`
  position: relative;
`

const LoadingBar = (props: any) => (
  <Base py={5} {...props}>
    <Loading />
  </Base>
)

export default LoadingBar
