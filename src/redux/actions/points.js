import * as actionTypes from 'redux/actionTypes'
import api from 'utils/api'

export const getPoints = () => async (dispatch) => {
    dispatch({ type: actionTypes.GET_POINTS_REQUEST })

    const response = await api.get('/points')

    if (response.status === 200) {
        dispatch({ type: actionTypes.GET_POINTS_SUCCESS, payload: response.data })
    } else {
        dispatch({ type: actionTypes.GET_POINTS_FAILURE, payload: response })
    }
}

export const getPointSale = (id) => async (dispatch) => {
    dispatch({ type: actionTypes.GET_POINTSALE_REQUEST })

    const response = await api.get(`/pointSales/${id}`)

    if (response.status === 200) {
        dispatch({ type: actionTypes.GET_POINTSALE_SUCCESS, payload: response.data })
    } else {
        dispatch({ type: actionTypes.GET_POINTSALE_FAILURE, payload: response })
    }
}

export const getPointSales = () => async (dispatch) => {
    dispatch({ type: actionTypes.GET_POINTSALES_REQUEST })

    const response = await api.get('/pointSales')
    if (response.status === 200) {
        dispatch({ type: actionTypes.GET_POINTSALES_SUCCESS, payload: response.data })
    } else {
        dispatch({ type: actionTypes.GET_POINTSALES_FAILURE, payload: response })
    }
}

export const createPointSale = (pointSale) => async (dispatch) => {
    dispatch({ type: actionTypes.CREATE_POINTSALE_REQUEST })

    const response = await api.post('/pointSales', pointSale)

    if (response.status === 201) {
        dispatch({ type: actionTypes.CREATE_POINTSALE_SUCCESS, payload: response.data })
    } else {
        dispatch({ type: actionTypes.CREATE_POINTSALE_FAILURE, payload: response })
    }
}

export const processpointSale = (id, accepted, options) => async (dispatch) => {
    dispatch({ type: actionTypes.PROCESS_POINTSALE_REQUEST })

    const url = accepted ? `/pointSales/${id}/accept` : `/pointSales/${id}/reject`
    const response = await api.post(url, options)

    if (response.status === 200) {
        const { member, ...pointSale } = response.data
        dispatch({ type: actionTypes.PROCESS_POINTSALE_SUCCESS, payload: { member, pointSale } })
    } else {
        dispatch({ type: actionTypes.PROCESS_POINTSALE_FAILURE, payload: response })
    }
}