import React, { Component, Fragment } from 'react'
import Link from 'gatsby-link'
import { Text, Flex, Box, Link as A } from '@hackclub/design-system'
import { Item } from '../Nav'
import Flag from '../Flag'
import LogoutButton from './LogoutButton'
import { withRouter } from 'react-router-dom'

const Crumb = A.withComponent(Link).extend`
  opacity: ${props => (props.active === 'true' ? 0.8 : 1)};
  text-transform: capitalize;
`

type ClassProps = {}
type ClassState = {
  path: Array<string>
}
class BreadcrumbClass extends Component<ClassProps, ClassState> {
  state = { path: [] }

  componentDidMount() {
    this.setState({ path: location.pathname.split('/').slice(1) })
  }

  render() {
    const { path }: ClassState = this.state
    const runningPath: Array<string> = ['']
    return (
      <Fragment>
        {path.map((section, index) => {
          runningPath.push(section)
          const isLast = path.length - index > 1
          return (
            <Fragment key={index}>
              <Crumb
                color="white"
                to={runningPath.join('/')}
                active={isLast.toString()}
              >
                {section}
              </Crumb>
              {isLast && (
                <Text.span mx={2} color="white" regular children="›" />
              )}
            </Fragment>
          )
        })}
      </Fragment>
    )
  }
}

const Breadcrumb = withRouter(BreadcrumbClass)

// Prevent validateDOMNesting error
Item.box = Item.withComponent(Box)

const ApplyNav = ({ breadcrumb = true, ...props }: { breadcrumb: boolean }) => (
  <Flex
    bg="primary"
    px={[2, 4]}
    pb={2}
    justify="space-between"
    align="center"
    w={1}
    style={{ position: 'relative' }}
    {...props}
  >
    <Flag />
    {breadcrumb ? (
      <Item.box f={[2, 4]} mt={2} w={32 * 16}>
        <Breadcrumb />
      </Item.box>
    ) : null}
    <LogoutButton mt={2} inverted />
  </Flex>
)

export default ApplyNav
