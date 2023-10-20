import * as actionTypes from 'redux/actionTypes'
import api from 'utils/api'

export const getSales = () => async (dispatch) => {
    dispatch({ type: actionTypes.GET_SALES_REQUEST })

    const response = await api.get('/sales')

    if (response.status === 200) {
        dispatch({ type: actionTypes.GET_SALES_SUCCESS, payload: response.data })
    } else {
        dispatch({ type: actionTypes.GET_SALES_FAILURE, payload: response })
    }
}
export const getSale = (id) => async (dispatch) => {
    dispatch({ type: actionTypes.GET_SALE_REQUEST })

    const response = await api.get(`/sales/${id}`)

    if (response.status === 200) {
        dispatch({ type: actionTypes.GET_SALE_SUCCESS, payload: response.data })
    } else {
        dispatch({ type: actionTypes.GET_SALE_FAILURE, payload: response })
    }
}
export const updateSale = ({ id, ...sale }) => async (dispatch) => {
    dispatch({ type: actionTypes.UPDATE_SALE_REQUEST })

    const response = await api.put(`/sales/${id}`, sale)

    if (response.status === 200) {
        dispatch({ type: actionTypes.UPDATE_SALE_SUCCESS, payload: response.data })
    } else {
        dispatch({ type: actionTypes.UPDATE_SALE_FAILURE, payload: response })
    }
}

export const deleteSale = (id) => async (dispatch) => {
    dispatch({ type: actionTypes.DELETE_SALE_REQUEST })

    const response = await api.delete(`/sales/${id}`)

    if (response.status === 200) {
        dispatch({ type: actionTypes.DELETE_SALE_SUCCESS, payload: { id } })
    } else {
        dispatch({ type: actionTypes.DELETE_SALE_FAILURE, payload: response })
    }
}

export const createSale = (sale) => async (dispatch) => {
    dispatch({ type: actionTypes.CREATE_SALE_REQUEST })

    const response = await api.post('/sales', sale)

    if (response.status === 201) {
        dispatch({ type: actionTypes.CREATE_SALE_SUCCESS, payload: response.data })
    } else {
        dispatch({ type: actionTypes.CREATE_SALE_FAILURE, payload: response })
    }
}
