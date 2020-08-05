import React, { useEffect, useState } from 'react';

import useWindowPosition from '../Hooks/useWindowPosition';

export const ModalContext = React.createContext({});

const ModalProvider = ({ children }) => {
  const { windowPosition } = useWindowPosition();
 

  return (
    <ModalContext.Provider
      value={{
        windowPosition,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
