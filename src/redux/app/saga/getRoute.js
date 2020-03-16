import { call, put, delay } from 'redux-saga/effects'

import { appApi } from '../../../services/app'
import { appActionCreators } from '../actions'

export function* recursiveGetRoute({ payload }) {
  let retryCount = 0
  function* getRoute() {
    try {
      if (retryCount === 100) {
        // 20 seconds
        retryCount = 0
        throw new Error('fail to get merged account login status')
      }

      const { data } = yield call(appApi.getRoute, payload)
      // if fetching success
      if (data.status === 'success') {
        yield put(appActionCreators.getRouteSuccess(data))
      }
      // if busy, then retry
      else if (data.status === 'in progress') {
        retryCount++
        yield delay(200)
        yield call(getRoute)
      }
      // if location not accessible by car
      else if (data.status === 'failure') {
        yield put(
          appActionCreators.requestFailure({
            message: 'Location not accessible by car'
          })
        )
      }
    } catch (e) {
      yield put(
        appActionCreators.requestFailure({
          message: 'Internal server error 500'
        })
      )
    }
  }
  yield call(getRoute)
}
