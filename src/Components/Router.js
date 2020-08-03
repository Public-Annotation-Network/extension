import { PrimaryButton, TerciaryButton } from './Buttons'
import React, { useEffect, useState } from 'react';

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
    if (tweetInfo[2] !== 'twitter.com' && tweetInfo[4] !== 'status') {
      setPageSupported(false)
    } else {
      setPageSupported(true)
      setPage(pages.reader)
    }
  }, [])

  return (
    <div id="modal" className="modal-window">
      <div className="modal-body">
        {page === pages.collapsed && <PrimaryButton label="See annotations" onClick={() => setPage('reader')} disabled={!pageSupported} />}
        {page === pages.reader && <Reader setPage={setPage} />}
        {page === pages.writer && <Writer setPage={setPage} />}
      </div>
    </div>)

}

export default Router