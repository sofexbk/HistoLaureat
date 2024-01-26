import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import Modal from 'react-modal';
import { CommentProvider } from './context/CommentContext';
import { StageProvider } from './context/StageContext';
document.body.style.zoom = "80%";
const root = ReactDOM.createRoot(document.getElementById('root'));
Modal.setAppElement('#root');
root.render(
  <React.StrictMode>
    <AuthContextProvider>
    <CommentProvider>
      <StageProvider>
      <App/>
      </StageProvider>
    </CommentProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
