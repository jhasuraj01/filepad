import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './infrastructure/state/app/store'
import App from './presentation/App'
import { BrowserRouter } from 'react-router-dom'
import reportWebVitals from './reportWebVitals'
import './presentation/index.scss'
import { PersistSelectedStates } from './presentation/supports/Persistence'
import { ConfigProvider, theme } from 'antd'

const container = document.getElementById('root')!
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename='/filepad'>
        <PersistSelectedStates>
          <ConfigProvider
            theme={{
              algorithm: theme.darkAlgorithm,
            }}
          >
            <App />
          </ConfigProvider>
        </PersistSelectedStates>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
