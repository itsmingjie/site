import React, { Fragment, Component } from 'react'
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
import PostRow from './PostRow'
import type { Props as RowProps } from './PostRow'
import { Modal, Overlay, CloseButton } from '../Modal'
import Comments from './Comments'
import { dt, tinyDt } from '../../helpers'
import { sortBy } from 'lodash'
import api from '../../api'

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

const CommentsModal = Modal.extend`
  display: grid;
  grid-template-rows: auto 1fr 2rem;
  min-height: 16rem;
`

export type Props = {}
export type State = {
  status: 'loading' | 'error' | 'success',
  email: string,
  commentsOpen: boolean,
  comments: Array<Object>
}
class Post extends Component<Props, State> {
  state = {
    status: 'loading',
    email: '',
    commentsOpen: false,
    comments: []
  }
  onOpen = (e: any) => {
    this.setState({ commentsOpen: true })
    let { email } = this.state
    if (typeof localStorage !== 'undefined') {
      email = localStorage.getItem('userEmail')
      this.setState({ email })
    }
    api
      .get(`v1/posts/${this.props.id}/comments`)
      .then(data => {
        const comments = sortBy(data, ['created_at'])
        this.setState({ comments, status: 'success' })
        this.poll()
      })
      .catch(err => {
        this.setState({ status: 'error' })
      })
  }
  componentWillUnmount() {
    this.unSchedule()
  }
  unSchedule = () => {
    clearTimeout(this.poller)
  }
  schedule = () => {
    this.poller = setTimeout(this.poll, 2048)
  }
  poll = () => {
    api
      .get(`v1/posts/${this.props.id}/comments`)
      .then(data => {
        const comments = sortBy(data, ['created_at'])
        this.setState({ comments })
        this.schedule()
      })
      .catch(err => {
        console.error(err)
      })
  }
  onClose = e => {
    this.setState({ commentsOpen: false })
    this.unSchedule()
  }
  render() {
    const {
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
      disabled
    }: RowProps = this.props
    const { status, commentsOpen, comments, email } = this.state
    return (
      <Fragment>
        <PostRow onComment={this.onOpen} {...this.props} />
        {commentsOpen && (
          <Fragment>
            <CommentsModal align="left" p={[3, 4]}>
              <CloseButton onClick={this.onClose} />
              <Comments
                name={name}
                url={url}
                status={status}
                id={id}
                email={email}
                data={comments}
              />
            </CommentsModal>
            <Overlay onClick={this.onClose} />
          </Fragment>
        )}
      </Fragment>
    )
  }
}
export default Post
