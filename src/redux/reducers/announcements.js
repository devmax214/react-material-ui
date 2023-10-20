import * as actionTypes from 'redux/actionTypes'
import * as R from 'ramda'

const initialState = {
    status: null,
    error: null,
    announcements: [],
    announcement: null,
}

function announcements(state = initialState, action) {
    let index

    switch (action.type) {
        case actionTypes.GET_ANNOUNCEMENTS_REQUEST:
            return {
                ...state,
                status: action.type,
                error: null,
            }
        case actionTypes.GET_ANNOUNCEMENTS_SUCCESS:
            return {
                status: action.type,
                announcements: action.payload,
                error: null,
            }
        case actionTypes.GET_ANNOUNCEMENTS_FAILURE:
            return {
                ...initialState,
                status: action.type,
                error: action.payload.error ? action.payload.error : "Couldn't get data",
            }
        case actionTypes.GET_ANNOUNCEMENT_SUCCESS:
            return {
                ...state,
                status: action.type,
                announcement: action.payload,
            }
        case actionTypes.GET_ANNOUNCEMENT_FAILURE:
            return {
                ...state,
                status: action.type,
                error: action.payload.error ? action.payload.error : "Couldn't get data",
            }
        case actionTypes.CREATE_ANNOUNCEMENT_REQUEST:
        case actionTypes.GET_ANNOUNCEMENT_REQUEST:
        case actionTypes.UPDATE_ANNOUNCEMENT_REQUEST:
        case actionTypes.DELETE_ANNOUNCEMENT_REQUEST:
        case actionTypes.UPDATE_ANNOUNCEMENTSTATUS_REQUEST:
            return {
                ...state,
                status: action.type,
                announcement: null,
                error: null,
            }
        case actionTypes.CREATE_ANNOUNCEMENT_SUCCESS:
            return {
                ...state,
                status: action.type,
                announcement: action.payload,
                announcements: [...state.announcements, action.payload],
                error: null,
            }
        case actionTypes.CREATE_ANNOUNCEMENT_FAILURE:
            return {
                ...state,
                status: action.type,
                error: action.payload.error ? action.payload.error : "Couldn't create data",
            }
        case actionTypes.UPDATE_ANNOUNCEMENT_SUCCESS:
            index = R.findIndex(R.propEq('id', action.payload.id))(state.announcements)
            if (index === -1) {
                return {
                    ...state,
                    status: action.type,
                    announcement: action.payload,
                }
            } else {
                state.announcements[index] = action.payload
                return {
                    ...state,
                    status: action.type,
                    announcement: action.payload,
                    announcements: [...state.announcements]
                }
            }
        case actionTypes.UPDATE_ANNOUNCEMENT_FAILURE:
            return {
                ...state,
                status: action.type,
                error: action.payload.error ? action.payload.error : "Couldn't save data",
            }
        case actionTypes.DELETE_ANNOUNCEMENT_SUCCESS:
            index = R.findIndex(R.propEq('id', action.payload.id))(state.announcements)
            if (index === -1) {
                return {
                    ...state,
                    status: action.type,
                }
            } else {
                return {
                    ...state,
                    status: action.type,
                    announcement: action.payload,
                    announcements: R.remove(index, 1, state.announcements)
                }
            }
        case actionTypes.DELETE_ANNOUNCEMENT_FAILURE:
            return {
                ...state,
                status: action.type,
                error: action.payload.error ? action.payload.error : "Couldn't delete data",
            }
        case actionTypes.UPDATE_ANNOUNCEMENTSTATUS_SUCCESS:
            action.payload.forEach(id => {
                const index = R.findIndex(R.propEq('id', id))(state.announcements)
                if (index !== -1) {
                    state.announcements[index].view = true;
                }
            })
            return {
                ...state,
                status: action.type,
                announcements: [...state.announcements],
            }
        case actionTypes.UPDATE_ANNOUNCEMENTSTATUS_FAILURE:
            return {
                ...state,
                status: action.type,
                error: action.payload.error ? action.payload.error : "Couldn't save data",
            }
        default:
            return state
    }
}

export default announcements
