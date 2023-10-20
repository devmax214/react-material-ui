import * as actionTypes from 'redux/actionTypes'
import api from 'utils/api'

export const getIncomes = () => async (dispatch) => {
    dispatch({ type: actionTypes.GET_INCOMES_REQUEST })

    const response = await api.get('/incomes')

    if (response.status === 200) {
        dispatch({ type: actionTypes.GET_INCOMES_SUCCESS, payload: response.data })
    } else {
        dispatch({ type: actionTypes.GET_INCOMES_FAILURE, payload: response })
    }
}
