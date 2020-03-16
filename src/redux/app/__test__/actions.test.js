import { GET_ROUTE, POST_ROUTE, appActionCreators } from '../actions'

test('get route action', () => {
  const params = { token: '' }
  const action = appActionCreators.getRoute(params)
  expect(action).toEqual({
    type: GET_ROUTE,
    payload: {
      token: ''
    }
  })
})

test('post route action', () => {
  const params = { route: {} }
  const action = appActionCreators.postRoute(params)
  expect(action).toEqual({
    type: POST_ROUTE,
    payload: {
      route: {}
    }
  })
})
