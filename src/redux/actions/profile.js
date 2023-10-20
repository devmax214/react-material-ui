import * as actionTypes from 'redux/actionTypes'
import api from 'utils/api'

export const getProfile = (id) => async (dispatch) => {
    dispatch({ type: actionTypes.GET_PROFILE_REQUEST })

    const response = await api.get(`/profile`)

    if (response.status === 200) {
        dispatch({ type: actionTypes.GET_PROFILE_SUCCESS, payload: response.data })
    } else {
        dispatch({ type: actionTypes.GET_PROFILE_FAILURE, payload: response })
    }
}

export const saveProfile = (data) => async (dispatch) => {
    dispatch({ type: actionTypes.SAVE_PROFILE_REQUEST })

    const response = await api.put(`/profile`, data)

    if (response.status === 200) {
        dispatch({ type: actionTypes.SAVE_PROFILE_SUCCESS, payload: response.data })
    } else {
        dispatch({ type: actionTypes.SAVE_PROFILE_FAILURE, payload: response })
    }
}

export const checkedAnnouncement = (id) => async (dispatch) => {
    dispatch({ type: actionTypes.CHECKED_ANNOUNCEMENT_REQUEST })

    const response = await api.put(`/announcements/${id}/read`)

    if (response.status === 201) {
        dispatch({ type: actionTypes.CHECKED_ANNOUNCEMENT_SUCCESS, payload: { id } })
    } else {
        dispatch({ type: actionTypes.CHECKED_ANNOUNCEMENT_FAILURE, payload: response })
    }
}
