import * as actionTypes from 'redux/actionTypes'
import api from 'utils/api'

export const getSettings = () => async (dispatch) => {
    dispatch({ type: actionTypes.GET_SETTINGS_REQUEST })

    const response = await api.get('/settings')

    if (response.status === 200) {
        dispatch({ type: actionTypes.GET_SETTINGS_SUCCESS, payload: response.data })
    } else {
        dispatch({ type: actionTypes.GET_SETTINGS_FAILURE, payload: response })
    }
}

export const createSetting = (setting) => async (dispatch) => {
    dispatch({ type: actionTypes.CREATE_SETTING_REQUEST })

    const response = await api.post('/settings', setting)

    if (response.status === 201) {
        dispatch({ type: actionTypes.CREATE_SETTING_SUCCESS, payload: response.data })
    } else {
        dispatch({ type: actionTypes.CREATE_SETTING_FAILURE, payload: response })
    }
}

export const updateSettings = (settings) => async (dispatch) => {
    dispatch({ type: actionTypes.UPDATE_SETTINGS_REQUEST })

    const response = await api.put('/settings', settings)

    if (response.status === 200) {
        dispatch({ type: actionTypes.UPDATE_SETTINGS_SUCCESS, payload: response.data })
    } else {
        dispatch({ type: actionTypes.UPDATE_SETTINGS_FAILURE, payload: response })
    }
}

export const deleteSetting = (id) => async (dispatch) => {
    dispatch({ type: actionTypes.DELETE_SETTING_REQUEST })

    const response = await api.delete(`/settings/${id}`)

    if (response.status === 200) {
        dispatch({ type: actionTypes.DELETE_SETTING_SUCCESS, payload: { id } })
    } else {
        dispatch({ type: actionTypes.DELETE_SETTING_FAILURE, payload: response })
    }
}
