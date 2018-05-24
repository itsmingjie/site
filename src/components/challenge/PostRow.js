import React from 'react'
import {
  Box,
  Flex,
  Icon,
  Button,
  Heading,
  Link,
  Text,
  Hide
} from '@hackclub/design-system'
import { dt, tinyDt } from 'helpers'

const Row = Flex.extend`
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.smoke};
  position: relative;
  a {
    flex: 1 1 auto;
  }
`

const Index = Hide.extend`
  width: ${({ theme }) => theme.space[3]}px;
  position: absolute;
  left: -${({ theme }) => theme.space[4]}px;
`

const Description = Text.extend`
  word-wrap: break-word;
  /*
  word-break is duplicated here because it has a different use in WebKit:
  https://css-tricks.com/snippets/css/prevent-long-urls-from-breaking-out-of-container
  */
  word-break: break-all;
  word-break: break-word;
`

const UpvoteButton = Button.button.extend`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 72px;
  box-shadow: none !important;
  cursor: ${props => props.cursor};
`

const CommentButton = Box.withComponent('button').extend`
  background: none;
  border: 0;
  appearance: none;
  font-family: inherit;
  font-size: ${({ theme }) => theme.fontSizes[0]}px;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: none !important;
  cursor: pointer;
  position: relative;
  padding-right: 0;
  margin: 0;
  span {
    position: absolute;
    width: 100%;
    top: ${({ theme }) => theme.space[2]}px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    padding-right: ${({ theme }) => theme.space[3]}px;
  }
`

export type Props = {
  id: number,
  name: string,
  url: string,
  description: string,
  createdAt?: string,
  mine?: boolean,
  disabled?: boolean,
  index: number,
  clickCount: number,
  commentsCount: number,
  upvotesCount: number,
  upvoted?: boolean,
  loading?: boolean,
  onUpvote: Function,
  onComment: Function
}

const PostRow = ({
  id,
  name,
  url,
  description,
  createdAt,
  mine,
  commentsCount,
  upvotesCount,
  upvoted = false,
  onUpvote,
  onComment,
  clickCount,
  disabled,
  loading,
  index
}: Props) => (
  <Row
    bg={mine ? 'yellow.0' : 'white'}
    title={mine ? '👑 Your post!' : `${name} posted on ${dt(createdAt)}`}
    py={[2, 3]}
    px={[2, 0]}
    id={`post-${id}`}
  >
    <Index sm xs>
      <Text
        align="right"
        color={mine ? 'warning' : 'muted'}
        bold
        children={index}
      />
    </Index>
    <Box>
      <UpvoteButton
        bg={upvoted ? 'primary' : 'smoke'}
        color={upvoted ? 'white' : 'slate'}
        aria-label={upvoted ? 'Remove your upvote' : 'Upvote this post'}
        onClick={onUpvote}
        disabled={loading}
        cursor={disabled ? 'not-allowed' : loading ? 'wait' : 'pointer'}
      >
        <Icon size={20} name="arrow_upward" />
        <Text.span ml={1} f={2} children={upvotesCount} />
      </UpvoteButton>
      <Flex
        w={1}
        align="center"
        justify="center"
        mt={1}
        title={`${clickCount} views`}
      >
        <Icon size={16} name="remove_red_eye" color="gray.5" />
        <Text.span
          ml={1}
          f={1}
          color="muted"
          style={{ lineHeight: 1 }}
          children={clickCount}
        />
      </Flex>
    </Box>
    <Link w={1} href={url} target="_blank" color="black" px={3}>
      <Heading.h3 f={3} m={0}>
        {name}
        <Text.span ml={2} f={0} mt={1} color="muted" regular>
          {tinyDt(createdAt)}
        </Text.span>
      </Heading.h3>
      <Description color="muted" f={2}>
        {description}
      </Description>
    </Link>
    <CommentButton
      aria-label={`Open comments: ${commentsCount}`}
      onClick={onComment}
    >
      <Icon
        name="chat_bubble"
        color={commentsCount === 0 ? 'gray.5' : 'info'}
        size={32}
      />
      <Text.span bold color="white" children={commentsCount} />
    </CommentButton>
  </Row>
)
export default PostRow
