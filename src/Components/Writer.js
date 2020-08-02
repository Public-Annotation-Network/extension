import React, { useEffect, useState } from 'react';
import { connectMetamask, signV4 } from '../services/ethereum'

import Annotation from '../Models/Annotation'
import Logo from '../images/logo'
import { ModalContext } from '../Contexts/ModalProvider';
import { getTweetData } from '../helpers'
import {sendAnnotationToPublisher} from '../services/publisher'

const Reader = ({ setPage }) => {
  const [web3Enabled, setWeb3Enabled] = useState(false)
  const [title, setTitle] = useState("nothing...")
  const [commentContent, setCommentContent] = useState('')
  const issueAnnotation = async () => {
    const tweetInfo = window.location.href.split('/')

    if (tweetInfo[2] !== 'twitter.com' && tweetInfo[4] !== 'status') {
      alert('This only works on Tweet pages')
    }

    const { tweetId, tweetAuthor } = getTweetData();

    let annotation = new Annotation({ content: commentContent, issuerEthAddress: "0xaBfEEA201208fcD0eE6a7073dFF0141dd7D7B04c", tweetAuthor, tweetId })
    await annotation.sign()
    // console.log(JSON.stringify(annotation.payload))
    const res = await sendAnnotationToPublisher(annotation.payload);
    console.log("🌐", res)
  }

  return (
    <ModalContext.Consumer>
      {(props) => (
        <div className="modal-content">
          <div className="modal-content__logo">
            <Logo />
            <h3>{`Comment Editor`}</h3>
          </div>
          <div className="modal-content__comment-editor">
            <TerciaryButton
              label="< Back to reading"
              onClick={() => setPage('reader')}
            />
            <CommentEditor commentContent={commentContent} setCommentContent={setCommentContent} />
          </div>
          <div className="modal-content__confirm">
            <PrimaryButton
              label="Comment"
              onClick={issueAnnotation}
            />
          </div>
        </div>
      )}
    </ModalContext.Consumer>
  );
};

export default Reader;


const CommentEditor = ({ setCommentContent, commentContent }) => {

  const updateCommentContent = (e) => {
    setCommentContent(e.target.value)
  }
  return (
    <div className="comment-editor">
      <textarea className="comment-editor__input" value={commentContent} onChange={updateCommentContent} />
    </div>
  )
}

const PrimaryButton = ({ label = 'ok', onClick, disabled = false }) => {
  return (
    <button className="primary-button" disabled={disabled} onClick={onClick}>
      {label}
    </button>
  )
}

const TerciaryButton = ({ label = 'ok', onClick, disabled = false }) => {
  return (
    <button className="terciary-button" disabled={disabled} onClick={onClick}>
      {label}
    </button>
  )
}