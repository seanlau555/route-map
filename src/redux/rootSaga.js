import { all, fork } from 'redux-saga/effects'
import { appSaga } from './app/saga'

export const combineSagas = sagas =>
  function* rootSaga() {
    try {
      yield all(sagas.map(fork))
    } catch (err) {
      console.error(err)
    }
  }

export const rootSaga = combineSagas([appSaga])
