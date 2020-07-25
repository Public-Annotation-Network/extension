import React, { useEffect, useState } from 'react';
import { connectMetamask, signV4 } from '../services/ethereum'

import Annotation from '../services/Annotation'
import Logo from '../images/logo'
import { ModalContext } from '../Contexts/ModalProvider';

const Reader = ({ setPage }) => {
  const [web3Enabled, setWeb3Enabled] = useState(false)
  const [title, setTitle] = useState("nothing...")
  const [commentContent, setCommentContent] = useState('')
  const issueAnnotation = async() => {
    const tweetInfo = window.location.href.split('/')

    if(tweetInfo[2] !== 'twitter.com' && tweetInfo[4] !== 'status') {
      alert('This only works on Tweet pages')
    }

    const tweetAuthor = tweetInfo[3]
    const tweetId = tweetInfo[5]

    let annotation = new Annotation({content: commentContent, issuerEthAddress:"0x123", tweetAuthor, tweetId})
    await annotation.sign()
    alert(JSON.stringify(annotation))
  }



  return (
    <ModalContext.Consumer>
      {(props) => (
        <div id="modal" className="modal-window">
          <div className="modal-body">
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