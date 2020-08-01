import React, { useEffect, useState } from 'react';
import { connectMetamask, signV4 } from '../services/ethereum'

import Annotation from '../Models/Annotation'
import Logo from '../images/logo'
import { ModalContext } from '../Contexts/ModalProvider';
import { getAnnotationsByReference } from '../services/publisher'
import { getAnnotationCIDsByReference } from '../services/graph'
import { getAnnotationData } from '../services/ipfs'
import { getTweetData } from '../helpers'

const Reader = ({ setPage }) => {
  const [web3Enabled, setWeb3Enabled] = useState(false)
  const [title, setTitle] = useState("nothing...")
  const [tweetAnnotations, setTweetAnnotations] = useState([])

  useEffect(() => {
    (async () => {
      const { tweetId, tweetAuthor } = getTweetData()
      // const annotationCIDs = await getAnnotationCIDsByReference({ reference: tweetId });
      // const annotations = [];
      // for (const annotationCID of annotationCIDs) {
      //   annotations.push(new Annotation({ payload: await getAnnotationData(annotationCID) }));
      // }
      const annotations = [];
      const annotationsFromPublisher = await getAnnotationsByReference({ reference: tweetId });
      for (const annotation of annotationsFromPublisher) {
        annotations.push(new Annotation({  payload: annotation }));
      }
      setTweetAnnotations(annotations);
    })();
  }, [])

  return (
    <ModalContext.Consumer>
      {(props) => (
        <div className="modal-content">
          <div className="modal-content__logo">
            <Logo />
            <h3>{`Reading comments`}</h3>
          </div>
          <div className="modal-content__comments">
            {tweetAnnotations.length > 0 && tweetAnnotations.map(a => {
              return (<Comment
                user={a.getShortAuthor()}
                date={a.getShortDate()}
                commentText={a.getContent()}
              />)
            })}
          </div>
          <div className="modal-content__confirm">
            <TerciaryButton
              label="Load more"
              onClick={() => { }}
            />
            <PrimaryButton
              label="Create a comment"
              onClick={() => setPage('writer')}
            />
          </div>

        </div>
      )}
    </ModalContext.Consumer>
  );
};

export default Reader;


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