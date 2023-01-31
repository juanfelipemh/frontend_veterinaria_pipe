import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import "bulma/css/bulma.css";
import { Provider } from 'react-redux';
import { store } from './app/store';
import axios from "axios"

axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
