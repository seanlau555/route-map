import * as R from 'ramda'
import { createSelector } from 'reselect'

const routeEntitySelector = ({ app }) => app.route

export const routeSelector = createSelector(
  routeEntitySelector,
  routeEntitySelector => {
    const get = R.pathOr(R.__, R.__, routeEntitySelector)
    return {
      path: get([], ['path']),
      totalDistance: get(0, ['total_distance']),
      totalTime: get(0, ['total_time'])
    }
  }
)
