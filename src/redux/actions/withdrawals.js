import * as actionTypes from 'redux/actionTypes'
import api from 'utils/api'

export const getWithdrawalList = () => async (dispatch) => {
    dispatch({ type: actionTypes.GET_WITHDRAWALS_REQUEST })

    const response = await api.get('/withdrawals')

    if (response.status === 200) {
        dispatch({ type: actionTypes.GET_WITHDRAWALS_SUCCESS, payload: response.data })
    } else {
        dispatch({ type: actionTypes.GET_WITHDRAWALS_FAILURE, payload: response })
    }
}

export const getWithdrawal = (id) => async (dispatch) => {
    dispatch({ type: actionTypes.GET_WITHDRAWAL_REQUEST })

    const response = await api.get(`/withdrawals/${id}`)

    if (response.status === 200) {
        dispatch({ type: actionTypes.GET_WITHDRAWAL_SUCCESS, payload: response.data })
    } else {
        dispatch({ type: actionTypes.GET_WITHDRAWAL_FAILURE, payload: response })
    }
}

export const createWithdrawal = (withdrawal) => async (dispatch) => {
    dispatch({ type: actionTypes.CREATE_WITHDRAWAL_REQUEST })

    const response = await api.post('/withdrawals', withdrawal)

    if (response.status === 201) {
        dispatch({ type: actionTypes.CREATE_WITHDRAWAL_SUCCESS, payload: response.data })
    } else {
        dispatch({ type: actionTypes.CREATE_WITHDRAWAL_FAILURE, payload: response })
    }
}

export const updateWithdrawal = ({ id, ...withdrawal }) => async (dispatch) => {
    dispatch({ type: actionTypes.UPDATE_WITHDRAWAL_REQUEST })

    const response = await api.put(`/withdrawals/${id}`, withdrawal)

    if (response.status === 200) {
        dispatch({ type: actionTypes.UPDATE_WITHDRAWAL_SUCCESS, payload: response.data })
    } else {
        dispatch({ type: actionTypes.UPDATE_WITHDRAWAL_FAILURE, payload: response })
    }
}

export const deleteWithdrawal = (id) => async (dispatch) => {
    dispatch({ type: actionTypes.DELETE_WITHDRAWAL_REQUEST })

    const response = await api.delete(`/withdrawals/${id}`)

    if (response.status === 200) {
        dispatch({ type: actionTypes.DELETE_WITHDRAWAL_SUCCESS, payload: { id } })
    } else {
        dispatch({ type: actionTypes.DELETE_WITHDRAWAL_FAILURE, payload: response })
    }
}

export const processWithdrawal = (id, accepted, options) => async (dispatch) => {
    dispatch({ type: actionTypes.PROCESS_WITHDRAWAL_REQUEST })

    const url = accepted ? `/withdrawals/${id}/accept` : `/withdrawals/${id}/reject`
    const response = await api.post(url, options)

    if (response.status === 200) {
        const { member, ...withdrawal } = response.data
        dispatch({ type: actionTypes.PROCESS_WITHDRAWAL_SUCCESS, payload: { member, withdrawal } })
    } else {
        dispatch({ type: actionTypes.PROCESS_WITHDRAWAL_FAILURE, payload: response })
    }
}
