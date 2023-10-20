import * as actionTypes from 'redux/actionTypes'
import api from 'utils/api'

export const getAnnouncements = () => async (dispatch) => {
    dispatch({ type: actionTypes.GET_ANNOUNCEMENTS_REQUEST })

    const response = await api.get('/announcements')

    if (response.status === 200) {
        dispatch({ type: actionTypes.GET_ANNOUNCEMENTS_SUCCESS, payload: response.data })
    } else {
        dispatch({ type: actionTypes.GET_ANNOUNCEMENTS_FAILURE, payload: response })
    }
}

export const getAnnouncement = (id) => async (dispatch) => {
    dispatch({ type: actionTypes.GET_ANNOUNCEMENT_REQUEST })

    const response = await api.get(`/announcements/${id}`)

    if (response.status === 200) {
        dispatch({ type: actionTypes.GET_ANNOUNCEMENT_SUCCESS, payload: response.data })
    } else {
        dispatch({ type: actionTypes.GET_ANNOUNCEMENT_FAILURE, payload: response })
    }
}

export const updateAnnouncement = ({ id, ...announcement }) => async (dispatch) => {
    dispatch({ type: actionTypes.UPDATE_ANNOUNCEMENT_REQUEST })

    const response = await api.put(`/announcements/${id}`, announcement)

    if (response.status === 200) {
        dispatch({ type: actionTypes.UPDATE_ANNOUNCEMENT_SUCCESS, payload: response.data })
    } else {
        dispatch({ type: actionTypes.UPDATE_ANNOUNCEMENT_FAILURE, payload: response })
    }
}

export const updateAnnouncementStatus = (ids) => async (dispatch) => {
    dispatch({ type: actionTypes.UPDATE_ANNOUNCEMENTSTATUS_REQUEST })

    const response = await api.post('/announcements/read', { ids: ids.join() })

    if (response.status === 200) {
        dispatch({ type: actionTypes.UPDATE_ANNOUNCEMENTSTATUS_SUCCESS, payload: ids })
        ids.forEach(id => {
            dispatch({ type: actionTypes.CHECKED_ANNOUNCEMENT_SUCCESS, payload: { id } })
        })
    } else {
        dispatch({ type: actionTypes.UPDATE_ANNOUNCEMENTSTATUS_FAILURE, payload: response })
    }
}

export const deleteAnnouncement = (id) => async (dispatch) => {
    dispatch({ type: actionTypes.DELETE_ANNOUNCEMENT_REQUEST })

    const response = await api.delete(`/announcements/${id}`)

    if (response.status === 200) {
        dispatch({ type: actionTypes.DELETE_ANNOUNCEMENT_SUCCESS, payload: { id } })
    } else {
        dispatch({ type: actionTypes.DELETE_ANNOUNCEMENT_FAILURE, payload: response })
    }
}

export const createAnnouncement = (announcement) => async (dispatch) => {
    dispatch({ type: actionTypes.CREATE_ANNOUNCEMENT_REQUEST })

    const response = await api.post('/announcements', announcement)

    if (response.status === 201) {
        dispatch({ type: actionTypes.CREATE_ANNOUNCEMENT_SUCCESS, payload: response.data })
    } else {
        dispatch({ type: actionTypes.CREATE_ANNOUNCEMENT_FAILURE, payload: response })
    }
}
