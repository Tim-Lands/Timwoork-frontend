import React from 'react'
import ReactTimeAgo from 'react-time-ago'

export default function LastSeen({ date }: any) {
  return (
    <span>
      <ReactTimeAgo date={date} locale="ar-AR"/>
    </span>
  )
}