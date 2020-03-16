import { handleActions } from 'redux-actions'
import {
  REQUEST_FAILURE,
  POST_ROUTE,
  POST_ROUTE_SUCCESS,
  GET_ROUTE_SUCCESS
} from './actions'

export const INITIAL_STATE = {
  token: '',
  origin: '',
  destination: '',
  route: null,
  errorMessage: '',
  isFetching: false
}

const postRoute = (state, { payload }) => {
  return {
    ...state,
    origin: payload.origin,
    destination: payload.destination,
    isFetching: true
  }
}

const postRouteSuccess = (state, { payload }) => {
  return {
    ...state,
    token: payload.token
  }
}

const getRouteSuccess = (state, { payload }) => {
  return {
    ...state,
    route: payload.route,
    isFetching: false
  }
}

const requestFailure = (state, { payload }) => {
  return {
    ...state,
    route: null,
    errorMessage: payload.message
  }
}

export const appReducer = handleActions(
  {
    [POST_ROUTE_SUCCESS]: postRouteSuccess,
    [GET_ROUTE_SUCCESS]: getRouteSuccess,
    [POST_ROUTE]: postRoute,

    [REQUEST_FAILURE]: requestFailure
  },
  INITIAL_STATE
)
