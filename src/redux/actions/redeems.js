import * as actionTypes from 'redux/actionTypes'
import api from 'utils/api'

export const getPointRedeemList = () => async (dispatch) => {
    dispatch({ type: actionTypes.GET_POINTREDEEMS_REQUEST })

    const response = await api.get('/redeems')

    if (response.status === 200) {
        dispatch({ type: actionTypes.GET_POINTREDEEMS_SUCCESS, payload: response.data })
    } else {
        dispatch({ type: actionTypes.GET_POINTREDEEMS_FAILURE, payload: response })
    }
}

export const getPointRedeem = (id) => async (dispatch) => {
    dispatch({ type: actionTypes.GET_POINTREDEEM_REQUEST })

    const response = await api.get(`/redeems/${id}`)

    if (response.status === 200) {
        dispatch({ type: actionTypes.GET_POINTREDEEM_SUCCESS, payload: response.data })
    } else {
        dispatch({ type: actionTypes.GET_POINTREDEEM_FAILURE, payload: response })
    }
}

export const createPointRedeem = (pointredeem) => async (dispatch) => {
    dispatch({ type: actionTypes.CREATE_POINTREDEEM_REQUEST })

    const response = await api.post('/redeems', pointredeem)

    if (response.status === 201) {
        dispatch({ type: actionTypes.CREATE_POINTREDEEM_SUCCESS, payload: response.data })
    } else {
        dispatch({ type: actionTypes.CREATE_POINTREDEEM_FAILURE, payload: response })
    }
}

export const processPointRedeem = (id, accepted, options) => async (dispatch) => {
    dispatch({ type: actionTypes.PROCESS_POINTREDEEM_REQUEST })

    const url = accepted ? `/redeems/${id}/accept` : `/redeems/${id}/reject`
    const response = await api.post(url, options)

    if (response.status === 200) {
        const { member, ...redeem } = response.data
        dispatch({ type: actionTypes.PROCESS_POINTREDEEM_SUCCESS, payload: { member, redeem } })
    } else {
        dispatch({ type: actionTypes.PROCESS_POINTREDEEM_FAILURE, payload: response })
    }
}
