import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Toaster } from 'react-hot-toast';
import { Provider } from "react-redux";
import { persistor, store } from './Components/homepage/Store';
import { PersistGate } from 'redux-persist/integration/react';
import AutorenewIcon from '@mui/icons-material/Autorenew';


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate loading={<AutorenewIcon />} persistor={persistor}>
          <App />
          <Toaster />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </React.StrictMode >
);
