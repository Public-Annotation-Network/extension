import { PrimaryButton, TerciaryButton } from './Buttons'
import React, { useEffect, useState } from 'react'

import Logo from '../images/logo-small'
import Reader from './Reader'
import Writer from './Writer'

const pages = {
  reader: "reader",
  writer: "writer",
  collapsed: 'collapsed'
}

const Router = () => {
  const [page, setPage] = useState(pages.collapsed)
  const [pageSupported, setPageSupported] = useState(false)

  useEffect(() => {
    const tweetInfo = window.location.href.split('/')
    if (tweetInfo[2].includes('twitter.com') && tweetInfo[4] === 'status') {
      setPageSupported(true)
      setPage(pages.collapsed)
    } else {
      setPageSupported(false)
    }
  }, [])

  return (
    <div id="modal" className={`modal-window ${page === pages.collapsed && 'modal-window--collapsed'}`}>
      <div className="modal-body">
        {page === pages.collapsed && <ToggleCollapseButton onClick={() => setPage('reader')} disabled={!pageSupported} />}
        {page === pages.reader && <Reader setPage={setPage} />}
        {page === pages.writer && <Writer setPage={setPage} />}
      </div>
    </div>)
}

export default Router

const ToggleCollapseButton = ({ label = 'ok', onClick, disabled = false }) => {
  return (
    <button className="primary-button" disabled={disabled} onClick={onClick}>
      <Logo />
    </button>
  )
}