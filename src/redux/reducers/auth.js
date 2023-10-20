import * as actionTypes from 'redux/actionTypes'

const initialState = {
    status: null,
    authenticated: false,
    adminAuthenticated: false,
    token: null,
    error: '',
}

function auth(state = initialState, action) {
    switch (action.type) {
        case actionTypes.AUTH_LOGIN_REQUEST:
        case actionTypes.ADMIN_LOGIN_REQUEST:
            return {
                ...initialState,
                status: action.type,
            }
        case actionTypes.AUTH_LOGIN_SUCCESS:
            return {
                status: action.type,
                authenticated: true,
                token: action.payload.token,
                error: null,
            }
        case actionTypes.ADMIN_LOGIN_SUCCESS:
            return {
                status: action.type,
                adminAuthenticated: true,
                token: action.payload.token,
                error: null,
            }
        case actionTypes.AUTH_LOGIN_FAILURE:
            return {
                ...initialState,
                status: action.type,
                error: action.payload.error ? action.payload.error : 'Member ID or password is wrong.',
            }
        case actionTypes.ADMIN_LOGIN_FAILURE:
            return {
                ...initialState,
                status: action.type,
                error: action.payload.error ? action.payload.error : 'Email or password is wrong.',
            }
        case actionTypes.AUTH_LOGOUT_SUCCESS:
        case actionTypes.ADMIN_LOGOUT_SUCCESS:
            return initialState
        default:
            return state
    }
}

export default auth
