import { appReducer, INITIAL_STATE } from '../reducer'
import { appActionCreators } from '../actions'

test('app state should merge with get route response', () => {
  const state = appReducer(INITIAL_STATE, {})
  const params = {}

  const nextState = appReducer(state, appActionCreators.getRouteSuccess(params))
  expect(nextState).toEqual({
    ...state,
    route: params,
    isFetching: false
  })
})

test('app state should merge with post route response', () => {
  const state = appReducer(INITIAL_STATE, {})
  const token = ''

  const nextState = appReducer(state, appActionCreators.postRouteSuccess(token))
  expect(nextState).toEqual({
    ...state,
    token
  })
})
