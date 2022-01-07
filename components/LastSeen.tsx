import React from 'react'
import TimeAgo from 'javascript-time-ago'
import ReactTimeAgo from 'react-time-ago'
import ar from 'javascript-time-ago/locale/ar.json'
import ru from 'javascript-time-ago/locale/ru.json'
import PropTypes from "prop-types";

TimeAgo.addDefaultLocale(ar)
TimeAgo.addLocale(ru)
export default function LastSeen({ date }) {
  return (
    <span>
      <ReactTimeAgo date={date} locale="ar-AR" />
    </span>
  )
}
LastSeen.propTypes = {
  date: PropTypes.any,
};