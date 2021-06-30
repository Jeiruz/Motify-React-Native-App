import { Provider } from 'react-redux'
import store from './Store'
import {persistedStore} from './Store'
import { PersistGate } from 'redux-persist/es/integration/react'
import Container from './components/Container'
import React from 'react'


export default function App() {
      return (
        <Provider store={store}>
          <PersistGate persistor={persistedStore} loading={null}>
              <Container/>
          </PersistGate>
        </Provider>
      )
    }
