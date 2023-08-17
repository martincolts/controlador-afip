import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ElectronContext } from './Context';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
//@ts-ignore    
console.log('the apiiiii', window.API)
root.render(
  <React.StrictMode>
    {//@ts-ignore    
      <ElectronContext.Provider value={window.API}>
        <App />
      </ElectronContext.Provider>}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
