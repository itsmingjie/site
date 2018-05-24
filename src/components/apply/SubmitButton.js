import React, { Component } from 'react'
import api from '../../api'
import storage from '../../storage'
import { LargeButton } from '@hackclub/design-system'

type Props = {
  status: 'complete' | 'submitted'
}

class SubmitButton extends Component<Props> {
  handleSubmit: Function = (e: any) => {
    const { status, applicationId, callback }: Props = this.props

    if (status !== 'complete') {
      return null
    }

    api
      .post(`v1/new_club_applications/${applicationId}/submit`, {
        authToken: storage.get('authToken')
      })
      .then(json => {
        callback(json)
      })
      .catch(e => {
        alert(e.statusText)
      })
  }

  render() {
    // NOTE(@MaxWofford): I'm trying to update the update button state when an application is reset
    // this.updateState()
    const { status }: Props = this.props

    // incomplete, complete, submitted
    return (
      <LargeButton
        onClick={this.handleSubmit}
        bg={status === 'submitted' ? 'accent' : 'primary'}
        disabled={status !== 'complete'}
        w={1}
        mb={2}
      >
        {status === 'submitted'
          ? 'We’ve recieved your application'
          : 'Submit your application'}
      </LargeButton>
    )
  }
}

export default SubmitButton
