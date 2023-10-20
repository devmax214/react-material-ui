import * as actionTypes from 'redux/actionTypes'
import api from 'utils/api'

export const getUsers = () => async (dispatch) => {
    dispatch({ type: actionTypes.GET_USERS_REQUEST })

    const response = await api.get('/users')

    if (response.status === 200) {
        dispatch({ type: actionTypes.GET_USERS_SUCCESS, payload: response.data })
    } else {
        dispatch({ type: actionTypes.GET_USERS_FAILURE, payload: response })
    }
}

export const getUser = (id) => async (dispatch) => {
    dispatch({ type: actionTypes.GET_USER_REQUEST })

    const response = await api.get(`/users/${id}`)

    if (response.status === 200) {
        dispatch({ type: actionTypes.GET_USER_SUCCESS, payload: response.data })
    } else {
        dispatch({ type: actionTypes.GET_USER_FAILURE, payload: response })
    }
}

export const createUser = (user) => async (dispatch) => {
    dispatch({ type: actionTypes.CREATE_USER_REQUEST })

    const response = await api.post('/users', user)

    if (response.status === 201) {
        dispatch({ type: actionTypes.CREATE_USER_SUCCESS, payload: response.data })
    } else {
        dispatch({ type: actionTypes.CREATE_USER_FAILURE, payload: response })
    }
}

export const updateUser = ({ id, ...user }) => async (dispatch) => {
    dispatch({ type: actionTypes.UPDATE_USER_REQUEST })

    const response = await api.put(`/users/${id}`, user)

    if (response.status === 200) {
        dispatch({ type: actionTypes.UPDATE_USER_SUCCESS, payload: response.data })
    } else {
        dispatch({ type: actionTypes.UPDATE_USER_FAILURE, payload: response })
    }
}

export const deleteUser = (id) => async (dispatch) => {
    dispatch({ type: actionTypes.DELETE_USER_REQUEST })

    const response = await api.delete(`/users/${id}`)

    if (response.status === 200) {
        dispatch({ type: actionTypes.DELETE_USER_SUCCESS, payload: { id } })
    } else {
        dispatch({ type: actionTypes.DELETE_USER_FAILURE, payload: response })
    }
}
