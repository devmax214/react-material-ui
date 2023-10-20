import * as actionTypes from 'redux/actionTypes'
import api from 'utils/api'

export const getDashboardData = () => async (dispatch) => {
  dispatch({ type: actionTypes.GET_DASHBOARD_REQUEST })

  const response = await api.get('/dashboard')

  if (response.status === 200) {
    dispatch({ type: actionTypes.GET_DASHBOARD_SUCCESS, payload: response.data })
  } else {
    dispatch({ type: actionTypes.GET_DASHBOARD_FAILURE, payload: response })
  }
}
