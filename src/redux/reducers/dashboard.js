import * as actionTypes from 'redux/actionTypes'

const initialState = {
    status: null,
    error: null,
    dashboard: null,
}

function dashboard(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_DASHBOARD_REQUEST:
            return {
                status: action.type,
                error: null,
                dashboard: null,
            }
        case actionTypes.GET_DASHBOARD_SUCCESS:
            return {
                ...state,
                status: action.type,
                dashboard: action.payload,
            }
        case actionTypes.GET_DASHBOARD_FAILURE:
            return {
                ...state,
                status: action.type,
                error: action.payload.error ? action.payload.error : "Couldn't get data",
            }
        default:
            return state
    }
}

export default dashboard