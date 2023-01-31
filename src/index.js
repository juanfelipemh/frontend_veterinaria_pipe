import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
//import "bulma/css/bulma.css";
import axios from "axios";
import 'bulma/css/bulma.min.css';

// Establecer credenciales predeterminadas. Si no se hace esto, se tiene que configurar manualmente en cada solicitud. Se incluyó en el index.js para que cada solicitud que realice el servidor (localhost:5000), las incluya siempre. Con esto no se necesita agregar las credenciales en cualquier solicitud
axios.defaults.withCredentials = true;

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

