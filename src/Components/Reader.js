import { PrimaryButton, TerciaryButton } from './Buttons';
import React, { useEffect, useState } from 'react';
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
  const [title, setTitle] = useState("nothing...")
  const [tweetAnnotations, setTweetAnnotations] = useState([])
  const [loadingInProgress, setLoadingInProgress] = useState(false)

  const sortByDate = (anno) => {
    window.annotations = anno
    return anno.sort((a, b) => {
      const dateA = (new Date(a.payload.issuanceDate)).getTime()
      const dateB = (new Date(b.payload.issuanceDate)).getTime()
      return (dateB - dateA)
    })
  }

  // useEffect(() => {
  //   (async () => {
  //     const { tweetId, tweetAuthor } = getTweetData()
  //     let annotations = [];
  //     try {
  //       const annotationsFromPublisher = await getAnnotationsByReference({ reference: tweetId });
  //       for (const annotation of annotationsFromPublisher) {
  //         annotations.push(new Annotation({ payload: annotation }));
  //       }
  //       annotations = sortByDate(annotations)
  //       setTweetAnnotations(annotations);
  //     } catch (error) {
  //       // fallback to the graph and ipfs
  //       const annotationCIDs = await getAnnotationCIDsByReference({ reference: tweetId });
  //       for (const annotationCID of annotationCIDs) {
  //         annotations.push(new Annotation({ payload: await getAnnotationData(annotationCID) }));
  //       }
  //       annotations = sortByDate(annotations)
  //       setTweetAnnotations(annotations);

  //     } finally {
  //       setLoadingInProgress(false)
  //     }
  //   })();
  // }, [])

  useEffect(() => {
    (async () => {
      setLoadingInProgress(true)
      const { tweetId, tweetAuthor } = getTweetData()
      let annotations = [];
      try {
        const annotationsFromPublisher = await getAnnotationsByReference({ reference: tweetId });
        for (const annotation of annotationsFromPublisher) {
          annotations.push(new Annotation({ payload: annotation }));
        }
        annotations = sortByDate(annotations)
        setTweetAnnotations(annotations);
        setLoadingInProgress(false)
      } 
      catch (error) {
        console.error("🚨", error)
        setLoadingInProgress(false)
        // // fallback to the graph and ipfs
        // const annotationCIDs = await getAnnotationCIDsByReference({ reference: tweetId });
        // for (const annotationCID of annotationCIDs) {
        //   annotations.push(new Annotation({ payload: await getAnnotationData(annotationCID) }));
        // }
        // annotations = sortByDate(annotations)
        // setTweetAnnotations(annotations);

      }
    })();
  }, [])

  return (
    <ModalContext.Consumer>
      {(props) => (
        <div className="modal-content">
          <div className="modal-content__close">
            <TerciaryButton label="hide" onClick={() => setPage('collapsed')} />
          </div>
          <div className="modal-content__logo">
            <Logo />
          </div>
          <div className="modal-content__comments modal-content__main">
            {loadingInProgress && <Loading />}
            {!loadingInProgress && tweetAnnotations.length > 0 && tweetAnnotations.map(a => {
              return (<Comment
                user={a.getShortAuthor()}
                date={a.getShortDate()}
                commentText={a.getContent()}
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
