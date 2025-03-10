import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
  useHistory,
} from 'react-router-dom';

import Footer from './components/layout/Footer';

import {
  BgShapeLeftTop,
  BgShapeCenter,
  BgShapeCenterSmall,
} from './components/icon';
import Modal from 'react-modal';

import './global.css';
import 'react-toastify/dist/ReactToastify.css';
import { FarmsPage } from '~pages/farms/FarmsPage';
import { AirdropPage } from '~pages/AirdropPage';
import PopUpSwiper from '~components/layout/PopUp';

import {
  WalletSelectorContextProvider,
  useWalletSelector,
} from './context/WalletSelectorContext';

import { Content } from '~Content';
import { LedgerTransactionModal } from './context/modal-ui/modal';

function App() {
  return (
    <Router>
      <div className="relative min-h-screen pb-24 overflow-x-hidden xs:flex xs:flex-col md:flex md:flex-col">
        <BgShapeLeftTop />
        <BgShapeCenterSmall />

        <WalletSelectorContextProvider>
          <Content />
        </WalletSelectorContextProvider>

        <Footer />
        <PopUpSwiper></PopUpSwiper>
      </div>

      <LedgerTransactionModal />
    </Router>
  );
}

export default App;
