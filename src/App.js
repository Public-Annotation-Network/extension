import './assets/styles/App.scss';

import Router from './Components/Router';
import ModalProvider from './Contexts/ModalProvider';
import React from 'react';

/**
 * @return {null}
 */
function App() {
  return (
    <ModalProvider>
      <Router />
    </ModalProvider>
  );
}

export default App;
