import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { CountryApp } from './CountryApp.jsx'
import { store } from './store/store.js'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <CountryApp />
    </Provider>
  </StrictMode>,
)
