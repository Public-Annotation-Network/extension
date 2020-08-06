import { PrimaryButton, TerciaryButton } from './Buttons';
import React, { useContext, useEffect, useState } from 'react';
import { connectMetamask, signV4 } from '../services/ethereum'

import Annotation from '../Models/Annotation'
import { Loading } from './Loading'
import Logo from '../images/logo'
import { ModalContext } from '../Contexts/ModalProvider';
import { getAnnotationCIDsByReference } from '../services/graph'
import { getAnnotationData } from '../services/ipfs'
import { getAnnotationsByReference } from '../services/publisher'
import { getTweetData } from '../helpers'

const Reader = ({ setPage }) => {
  const [web3Enabled, setWeb3Enabled] = useState(false)
  const {
    tweetAnnotations,
    loadingInProgress,
    loadAnnotations,
    dataSource
  } = useContext(ModalContext);

  useEffect(() => {
    loadAnnotations(true)
  }, [])


  return (
    <div className="modal-content">
      <div className="modal-content__close">
        <TerciaryButton label="hide" onClick={() => setPage('collapsed')} />
      </div>
      <div className="modal-content__logo">
        <Logo />
      </div>
      <div className="modal-content__comments modal-content__main">
        {loadingInProgress && <Loading label="Loading annotations" />}
        {!loadingInProgress && tweetAnnotations.length > 0 && tweetAnnotations.map(a => {
          return (<Comment
            user={a.getShortAuthor()}
            date={a.getShortDate()}
            commentText={a.getContent()}
            published={a.isPublished()}
            displayPublishedTooltip={dataSource === 'publisher'}

          />)
        })}
        {!loadingInProgress && tweetAnnotations.length === 0 && <>
          <p>No anotations to display</p>
          <TerciaryButton
            label="Be the first to Comment!"
            onClick={() => setPage('writer')}
          />
        </>
        }
      </div>
      <div className="modal-content__confirm">
        <TerciaryButton
          label="Load more"
          onClick={loadAnnotations}
        />
        <PrimaryButton
          label="Create a comment"
          onClick={() => setPage('writer')}
        />
      </div>

    </div>
  )
};

export default Reader;


const Comment = ({ user, date, commentText, published, displayPublishedTooltip }) => {
  return (
    <div className="text-comment">
      <div className="header">
        <p className="header__author small-text">{user}</p>
        <p className="header__date small-text">{date}</p>
      </div>
      <div className="comment-body">
        <p className="comment-body__text"><PublishedTooltip published={published} />{commentText}</p>

      </div>
    </div>
  )
}

const PublishedTooltip = ({ published }) => {
  return (
    <div className="tooltip">
      <span className="tooltip__icon">{published ? "✅" : "⏳"}</span>
      <span className="tooltip__hover-text">{published ? "This annotation has been published." : "This annotation has not yet been published."}</span>
    </div>)
}
