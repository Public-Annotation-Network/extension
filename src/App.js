import './assets/styles/App.scss';

import Modal from './Components/Modal';
import ModalProvider from './Contexts/ModalProvider';
import React from 'react';

/**
 * @return {null}
 */
function App() {
  return (
    <ModalProvider>
      <Modal />
    </ModalProvider>
  );
}

export default App;
