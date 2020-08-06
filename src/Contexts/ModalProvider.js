import React, { useEffect, useState } from 'react';
import { getTweetData, sortByDate } from '../helpers'

import Annotation from '../Models/Annotation'
import { Loading } from '../Components/Loading'
import Logo from '../images/logo'
import { getAnnotationCIDsByReference } from '../services/graph'
import { getAnnotationData } from '../services/ipfs'
import { getAnnotationsByReference } from '../services/publisher'
import useWindowPosition from '../Hooks/useWindowPosition';

export const ModalContext = React.createContext({});

const ModalProvider = ({ children }) => {
  const { windowPosition } = useWindowPosition();

  const [tweetAnnotations, setTweetAnnotations] = useState([])
  const [loadingInProgress, setLoadingInProgress] = useState(false)

  const loadAnnotations = async (withAnimation = false) => {
    (withAnimation && setLoadingInProgress(true))
    const { tweetId, tweetAuthor } = getTweetData()
    let annotations = [];
    try {
      const annotationsFromPublisher = await getAnnotationsByReference({ reference: tweetId });
      for (const annotation of annotationsFromPublisher) {
        annotations.push(new Annotation({ payload: annotation }));
      }
      annotations = sortByDate(annotations)
      setTweetAnnotations(annotations);
      (withAnimation && setLoadingInProgress(false))
    }
    catch (error) {
      console.error("🚨", error)
        (withAnimation && setLoadingInProgress(false))
    }

  }

  useEffect(() => {
    let id = setInterval(() => {
      loadAnnotations()
    }, 5000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    loadAnnotations(true)
  }, [])


  return (
    <ModalContext.Provider
      value={{
        windowPosition,
        tweetAnnotations,
        setTweetAnnotations,
        loadingInProgress,
        setLoadingInProgress,
        loadAnnotations
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
