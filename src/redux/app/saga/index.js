import { all, takeLatest } from 'redux-saga/effects'

import { recursiveGetRoute } from './getRoute'
import { postRoute } from './postRoute'
import { POST_ROUTE, GET_ROUTE } from '../actions'

export function* appSaga() {
  yield all([
    takeLatest(POST_ROUTE, postRoute),
    takeLatest(GET_ROUTE, recursiveGetRoute),
  ])
}
