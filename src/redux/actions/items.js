import * as actionTypes from 'redux/actionTypes'
import api from 'utils/api'

export const getPointItem = (id) => async (dispatch) => {
    dispatch({ type: actionTypes.GET_POINTITEM_REQUEST })

    const response = await api.get(`/items/${id}`)

    if (response.status === 200) {
        dispatch({ type: actionTypes.GET_POINTITEM_SUCCESS, payload: response.data })
    } else {
        dispatch({ type: actionTypes.GET_POINTITEM_FAILURE, payload: response })
    }
}

export const getPointItems = () => async (dispatch) => {
    dispatch({ type: actionTypes.GET_POINTITEMS_REQUEST })

    const response = await api.get('/items')
    if (response.status === 200) {
        dispatch({ type: actionTypes.GET_POINTITEMS_SUCCESS, payload: response.data })
    } else {
        dispatch({ type: actionTypes.GET_POINTITEMS_FAILURE, payload: response })
    }
}

export const createPointItem = (item) => async (dispatch) => {
    dispatch({ type: actionTypes.CREATE_POINTITEM_REQUEST })

    const response = await api.post('/items', item)

    if (response.status === 201) {
        dispatch({ type: actionTypes.CREATE_POINTITEM_SUCCESS, payload: response.data })
    } else {
        dispatch({ type: actionTypes.CREATE_POINTITEM_FAILURE, payload: response })
    }
}

export const updatePointItem = (id, item) => async (dispatch) => {
    dispatch({ type: actionTypes.UPDATE_POINTITEM_REQUEST })

    const response = await api.post(`/items/${id}`, item)

    if (response.status === 200) {
        dispatch({ type: actionTypes.UPDATE_POINTITEM_SUCCESS, payload: response.data })
    } else {
        dispatch({ type: actionTypes.UPDATE_POINTITEM_FAILURE, payload: response })
    }
}

export const deletePointItem = (id) => async (dispatch) => {
    dispatch({ type: actionTypes.DELETE_POINTITEM_REQUEST })

    const response = await api.delete(`/items/${id}`)

    if (response.status === 200) {
        dispatch({ type: actionTypes.DELETE_POINTITEM_SUCCESS, payload: { id } })
    } else {
        dispatch({ type: actionTypes.DELETE_POINTITEM_FAILURE, payload: response })
    }
}
