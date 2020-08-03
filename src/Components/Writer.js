import React, { useEffect, useState } from 'react';
import { connectMetamask, signV4 } from '../services/ethereum'

import Annotation from '../Models/Annotation'
import { Loading } from './Loading';
import Logo from '../images/logo'
import { ModalContext } from '../Contexts/ModalProvider';
import { getTweetData } from '../helpers'
import { sendAnnotationToPublisher } from '../services/publisher'

const Writer = ({ setPage }) => {
  const [web3Enabled, setWeb3Enabled] = useState(false)
  const [title, setTitle] = useState("nothing...")
  const [publishingStage, setPublishingStage] = useState(0)
  const [commentContent, setCommentContent] = useState('')

  const issueAnnotation = async () => {
    setPublishingStage(1)
    const tweetInfo = window.location.href.split('/')

    try {
      const { tweetId, tweetAuthor } = getTweetData();
      let annotation = new Annotation({ content: commentContent, tweetAuthor, tweetId })
      await annotation.sign()
      const res = await sendAnnotationToPublisher(annotation.payload);
      setPublishingStage(2)
      console.log("🌐", res)
    } catch (e) {
      setPublishingStage(3)
    }
  }

  return (
    <ModalContext.Consumer>
      {(props) => (
        <div className="modal-content">
          <div className="modal-content__logo">
            <Logo />
            {/* <h3>{`Comment Editor`}</h3> */}
          </div>
          <div className="modal-content__comment-editor modal-content__main">
            <TerciaryButton
              label="< Back to reading"
              onClick={() => setPage('reader')}
            />
            
            {publishingStage === 0 && <CommentEditor commentContent={commentContent} setCommentContent={setCommentContent} />}
            {publishingStage === 1 && <Loading />}
            {publishingStage === 2 && <p>🚀 Your comment has been published!</p>}
            {publishingStage === 3 && <p>😭 There was an error publishing your comment. Please try again.</p>}
          </div>
          <div className="modal-content__confirm">
            <PrimaryButton
              label="Comment"
              onClick={issueAnnotation}
              disabled={!window.ethereum.selectedAddress}
            />
            {!window.ethereum.selectedAddress && <TerciaryButton
              label="Link Metamask"
              onClick={connectMetamask}
            />}
          </div>
        </div>
      )}
    </ModalContext.Consumer>
  );
};

export default Writer;


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