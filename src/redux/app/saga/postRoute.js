import { call, put } from 'redux-saga/effects'

import { appApi } from '../../../services/app'
import { appActionCreators } from '../actions'

export function* postRoute({ payload }) {
  try {
    const { data } = yield call(appApi.postRoute, payload)
    yield put(appActionCreators.postRouteSuccess(data.token))
    yield put(appActionCreators.getRoute(data.token))
  } catch (e) {
    yield put(
      appActionCreators.requestFailure({
        message: 'Internal server error 500'
      })
    )
  }
}
