import React, { useEffect, useState } from 'react';
import { connectMetamask, signV4 } from '../services/ethereum'

import Logo from '../images/logo'
import { ModalContext } from '../Contexts/ModalProvider';

const Reader = ({ setPage }) => {
  const [web3Enabled, setWeb3Enabled] = useState(false)
  const [title, setTitle] = useState("nothing...")

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
                <CommentEditor />
              </div>
              <div className="modal-content__confirm">
                <PrimaryButton
                  label="Comment"
                  onClick={() => setPage('reader')}
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


const CommentEditor = ({ }) => {
  const [commentContent, setCommentContent] = useState('')
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