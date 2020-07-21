import React, { useEffect, useState } from 'react';
import { connectMetamask, signV4 } from '../services/ethereum'

import Logo from '../images/logo'
import { ModalContext } from '../Contexts/ModalProvider';

const Modal = () => {
  const [web3Enabled, setWeb3Enabled] = useState(false)
  const [title, setTitle] = useState("nothing...")

  // useEffect(() => {
  //   window.addEventListener("message", (event) => {
  //     setTitle(event.data)
  //   }, false);
  // }, [])


  // useEffect(() => {
  //   window.chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  //     console.log("GOT Message from the content script: " +
  //       request.greeting);
  //     // sendResponse({response: "Response from background script"});
  //   });
  // })

  return (
    <ModalContext.Consumer>
      {(props) => (
        <div id="modal" className="modal-window">
          <div className="modal-body">
            <div className="modal-content">
              {/* <img src={logo} className="modal-content__logo"/> */}
              <div className="modal-content__logo">
                <Logo />
                <h3>{`What people are saying...`}</h3>
              </div>
              <div className="modal-content__comments">
                <Comment
                  user="Joe cool"
                  date="July 12"
                  commentText="Do you know what this is? It's the world's smallest violin playing just for the waitresses."
                />

                <Comment
                  user="Everyone, ever"
                  date="July 13"
                  commentText="May the Force be with you."
                />
                <Comment
                  user="Punk"
                  date="July 13"
                  commentText="Go ahead, make my day."
                />
                <Comment
                  user="Car Salesperson"
                  date="July 13"
                  commentText="I'm going to make him an offer he can't refuse."
                />
                <Comment
                  user="Jane Doe"
                  date="July 13"
                  commentText="There's no place like home."
                />
                <Comment
                  user="John Doe"
                  date="July 13"
                  commentText="You talking to me?"
                />
                <Comment
                  user="Journalist"
                  date="July 13"
                  commentText="What we've got here is failure to communicate."
                />
                <Comment
                  user="Billy boy"
                  date="July 13"
                  commentText="D-J-A-N-G-O. The D is silent."
                />
              </div>
              <div className="modal-content__confirm">
                <TerciaryButton
                  label="Load more"
                  onClick={()=> {}}
                />
                <PrimaryButton
                  label="Comment"
                  onClick={async () => {
                    const sig = await signV4()
                    console.log("🚨", sig)
                  }}
                />
              </div>

            </div>
          </div>
        </div>
      )}
    </ModalContext.Consumer>
  );
};

export default Modal;


const Comment = ({ user, date, commentText }) => {
  return (
    <div className="text-comment">
      <div className="header">
        <p className="header__author small-text">{user}</p>
        <p className="header__date small-text">{date}</p>
      </div>
      <div className="comment-body">
        <p className="comment-body__text">{commentText}</p>
      </div>
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