import React, { Component, Fragment } from 'react'
import Helmet from 'react-helmet'
import { Flex, Heading, colors } from '@hackclub/design-system'
import LoginForm from 'components/apply/LoginForm'
import Flag from 'components/Flag'

const Base = Flex.extend.attrs({
  flexDirection: 'column',
  justify: 'center',
  align: 'center'
})`
  width: 100vw;
  height: 100vh;
`

const FixedFlag = Flag.extend`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
`

const Login = ({
  userType = 'applicant'
}: {
  userType: 'admin' | 'applicant'
}) => {
  const admin: boolean = userType === 'admin'
  const color: string = admin ? colors.green[5] : 'white'
  const bg: string = admin ? '#000' : 'primary'

  return (
    <Fragment>
      <Helmet title="Log in – Hack Club" />
      <FixedFlag />
      <Base color={color} bg={bg}>
        <Heading.h1 f={2} mb={3} caps color={color}>
          {admin ? 'Admin login' : 'Start your application'}
        </Heading.h1>
        <LoginForm
          color={color}
          bg={bg}
          inputProps={{ mx: 'auto', w: 24 * 16 }}
          textProps={{ align: 'center', f: 4 }}
        />
      </Base>
    </Fragment>
  )
}

export default Login
