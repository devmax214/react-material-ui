import * as actionTypes from 'redux/actionTypes'
import * as R from 'ramda'

const initialState = {
    status: null,
    error: null,
    settings: [],
    setting: null,
}

function settings(state = initialState, action) {
    let index

    switch (action.type) {
        case actionTypes.GET_SETTINGS_REQUEST:
            return {
                ...state,
                status: action.type,
                settings: [],
                error: null,
            }
        case actionTypes.GET_SETTINGS_SUCCESS:
        case actionTypes.UPDATE_SETTINGS_SUCCESS:
            return {
                ...state,
                status: action.type,
                settings: action.payload,
            }
        case actionTypes.GET_SETTINGS_FAILURE:
            return {
                ...state,
                status: action.type,
                error: action.payload.error ? action.payload.error : "Couldn't get data",
            }
        case actionTypes.CREATE_SETTING_REQUEST:
        case actionTypes.UPDATE_SETTINGS_REQUEST:
        case actionTypes.DELETE_SETTING_REQUEST:
            return {
                ...state,
                status: action.type,
                setting: null,
                error: null,
            }
        case actionTypes.CREATE_SETTING_SUCCESS:
            return {
                ...state,
                status: action.type,
                setting: action.payload,
                settings: [...state.settings, action.payload],
                error: null,
            }
        case actionTypes.CREATE_SETTING_FAILURE:
            return {
                ...state,
                status: action.type,
                error: action.payload.error ? action.payload.error : "Couldn't create data",
            }
        case actionTypes.UPDATE_SETTINGS_FAILURE:
            return {
                ...state,
                status: action.type,
                error: action.payload.error ? action.payload.error : "Couldn't save data",
            }
        case actionTypes.DELETE_SETTING_SUCCESS:
            index = R.findIndex(R.propEq('id', action.payload.id))(state.settings)
            if (index === -1) {
                return {
                    ...state,
                    status: action.type,
                }
            } else {
                return {
                    ...state,
                    status: action.type,
                    setting: action.payload,
                    settings: R.remove(index, 1, state.settings)
                }
            }
        case actionTypes.DELETE_SETTING_FAILURE:
            return {
                ...state,
                status: action.type,
                error: action.payload.error ? action.payload.error : "Couldn't delete data",
            }

        default:
            return state
    }
}

export default settings
