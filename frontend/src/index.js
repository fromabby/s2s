import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { AuthContextProvider } from './context/authContext'
import { positions, transitions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-snackbar-material-ui'
import '@fortawesome/fontawesome-free/css/all.min.css';
// import 'bootstrap-css-only/css/bootstrap.min.css';
// import 'mdbreact/dist/css/mdb.css';

const options = {
  timeout: 2000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE
}

ReactDOM.render(
  <React.StrictMode>
    <AlertProvider template={AlertTemplate} {...options}>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </AlertProvider>
  </React.StrictMode>,
  document.getElementById('root')
)