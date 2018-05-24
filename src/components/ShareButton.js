import * as React from 'react'
import { Box, Button } from '@hackclub/design-system'

export const SocialButton = Button.extend`
  display: inline-flex;
  align-items: center;
  div {
    background-image: url(/social/${({ service }: { service: string }) =>
        service
          .toLowerCase()
          .split(' ')
          .join('')}-white.svg);
    background-repeat: no-repeat;
    background-size: 100%;
    flex-shrink: none;
    width: 18px;
    height: 18px;
  }
`

const ShareButton = ({
  service,
  children,
  ...props
}: {
  service: string,
  children?: React.Node
}) => (
  <SocialButton
    target="_blank"
    aria-label={`Share on ${service}`}
    f={2}
    {...props}
  >
    <Box mr={2} />
    {children || service}
  </SocialButton>
)

export default ShareButton
