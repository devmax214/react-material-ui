import * as actionTypes from 'redux/actionTypes'

const initialState = {
    status: null,
    error: null,
    incomes: [],
}

function incomes(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_INCOMES_REQUEST:
            return {
                ...state,
                status: actionTypes.GET_INCOMES_REQUEST,
                error: null,
            }
        case actionTypes.GET_INCOMES_SUCCESS:
            return {
                status: actionTypes.GET_INCOMES_SUCCESS,
                incomes: action.payload,
                error: null,
            }
        case actionTypes.GET_INCOMES_FAILURE:
            return {
                ...initialState,
                status: actionTypes.GET_INCOMES_FAILURE,
                error: action.payload.error ? action.payload.error : "Couldn't get data",
            }
        default:
            return state
    }
}

export default incomes
