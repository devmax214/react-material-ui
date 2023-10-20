import * as actionTypes from 'redux/actionTypes'
import * as R from 'ramda'

const initialState = {
    status: null,
    error: null,
    users: [],
    user: null,
}

function users(state = initialState, action) {
    let index

    switch (action.type) {
        case actionTypes.GET_USERS_REQUEST:
            return {
                ...state,
                status: actionTypes.GET_USERS_REQUEST,
                error: null,
            }
        case actionTypes.GET_USERS_SUCCESS:
            return {
                status: actionTypes.GET_USERS_SUCCESS,
                users: action.payload,
                error: null,
            }
        case actionTypes.GET_USERS_FAILURE:
            return {
                ...initialState,
                status: actionTypes.GET_USERS_FAILURE,
                error: action.payload.error ? action.payload.error : "Couldn't get data",
            }
        case actionTypes.GET_USER_REQUEST:
        case actionTypes.CREATE_USER_REQUEST:
        case actionTypes.UPDATE_USER_REQUEST:
        case actionTypes.DELETE_USER_REQUEST:
            return {
                ...state,
                status: action.type,
                user: null,
                error: null,
            }
        case actionTypes.GET_USER_SUCCESS:
            return {
                ...state,
                status: action.type,
                user: action.payload,
            }
        case actionTypes.GET_USER_FAILURE:
            return {
                ...state,
                status: action.type,
                error: action.payload.error ? action.payload.error : "Couldn't get data",
            }
        case actionTypes.CREATE_USER_SUCCESS:
            return {
                ...state,
                status: action.type,
                user: action.payload,
                users: [...state.users, action.payload],
                error: null,
            }
        case actionTypes.CREATE_USER_FAILURE:
            return {
                ...state,
                status: action.type,
                error: action.payload.error ? action.payload.error : "Couldn't create data",
            }
        case actionTypes.UPDATE_USER_SUCCESS:
            index = R.findIndex(R.propEq('id', action.payload.id))(state.users)
            if (index === -1) {
                return {
                    ...state,
                    status: action.type,
                    user: action.payload,
                }
            } else {
                state.users[index] = action.payload
                return {
                    ...state,
                    status: action.type,
                    user: action.payload,
                    users: [...state.users]
                }
            }
        case actionTypes.UPDATE_USER_FAILURE:
            return {
                ...state,
                status: action.type,
                error: action.payload.error ? action.payload.error : "Couldn't save data",
            }
        case actionTypes.DELETE_USER_SUCCESS:
            index = R.findIndex(R.propEq('id', action.payload.id))(state.users)
            if (index === -1) {
                return {
                    ...state,
                    status: action.type,
                }
            } else {
                return {
                    ...state,
                    status: action.type,
                    user: action.payload,
                    users: R.remove(index, 1, state.users)
                }
            }
        case actionTypes.DELETE_USER_FAILURE:
            return {
                ...state,
                status: action.type,
                error: action.payload.error ? action.payload.error : "Couldn't delete data",
            }
        default:
            return state
    }
}

export default users
