import { createAction } from 'redux-actions'

export const POST_ROUTE = 'app/POST_ROUTE'
export const POST_ROUTE_SUCCESS = 'app/POST_ROUTE_SUCCESS'
export const GET_ROUTE = 'app/GET_ROUTE'
export const GET_ROUTE_SUCCESS = 'app/GET_ROUTE_SUCCESS'
export const REQUEST_FAILURE = 'app/REQUEST_FAILURE'

export const appActionCreators = {
  getRoute: createAction(GET_ROUTE, token => token),
  getRouteSuccess: createAction(GET_ROUTE_SUCCESS, route => ({ route })),
  postRoute: createAction(POST_ROUTE, params => params),
  postRouteSuccess: createAction(POST_ROUTE_SUCCESS, token => ({
    token
  })),
  requestFailure: createAction(REQUEST_FAILURE, err => err)
}
