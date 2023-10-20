import * as actionTypes from 'redux/actionTypes'
import * as R from 'ramda'

const initialState = {
    status: null,
    error: null,
    withdrawals: [],
    withdrawal: null,
}

function withdrawals(state = initialState, action) {
    let index
    switch (action.type) {
        case actionTypes.GET_WITHDRAWALS_REQUEST:
            return {
                ...state,
                status: action.type,
                withdrawals: [],
                error: null,
            }
        case actionTypes.GET_WITHDRAWALS_SUCCESS:
            return {
                ...state,
                status: action.type,
                withdrawals: action.payload,
            }
        case actionTypes.GET_WITHDRAWALS_FAILURE:
            return {
                ...state,
                status: action.type,
                error: action.payload.error ? action.payload.error : "Couldn't get data",
            }
        case actionTypes.GET_WITHDRAWAL_REQUEST:
        case actionTypes.CREATE_WITHDRAWAL_REQUEST:
        case actionTypes.UPDATE_WITHDRAWAL_REQUEST:
        case actionTypes.DELETE_WITHDRAWAL_REQUEST:
        case actionTypes.PROCESS_WITHDRAWAL_REQUEST:
            return {
                ...state,
                status: action.type,
                withdrawal: null,
                error: null,
            }
        case actionTypes.GET_WITHDRAWAL_SUCCESS:
            return {
                ...state,
                status: action.type,
                withdrawal: action.payload,
            }
        case actionTypes.GET_WITHDRAWAL_FAILURE:
            return {
                ...state,
                status: action.type,
                error: action.payload.error ? action.payload.error : "Couldn't get data",
            }
        case actionTypes.CREATE_WITHDRAWAL_SUCCESS:
            return {
                ...state,
                status: action.type,
                withdrawal: action.payload,
                withdrawals: [...state.withdrawals, action.payload],
                error: null,
            }
        case actionTypes.CREATE_WITHDRAWAL_FAILURE:
            return {
                ...state,
                status: action.type,
                error: action.payload.error ? action.payload.error : "Couldn't create data",
            }
        case actionTypes.UPDATE_WITHDRAWAL_SUCCESS:
            index = R.findIndex(R.propEq('id', action.payload.id))(state.withdrawals)
            if (index === -1) {
                return {
                    ...state,
                    status: action.type,
                    withdrawal: action.payload,
                }
            } else {
                state.withdrawals[index] = action.payload
                return {
                    ...state,
                    status: action.type,
                    withdrawal: action.payload,
                    withdrawals: [...state.withdrawals]
                }
            }
        case actionTypes.PROCESS_WITHDRAWAL_SUCCESS:
            index = R.findIndex(R.propEq('id', action.payload.id))(state.withdrawals)
            if (index === -1) {
                return {
                    ...state,
                    status: action.type,
                    withdrawal: action.payload.withdrawal,
                }
            } else {
                state.withdrawals[index] = action.payload.withdrawal
                return {
                    ...state,
                    status: action.type,
                    withdrawal: action.payload.withdrawal,
                    withdrawals: [...state.withdrawals]
                }
            }
        case actionTypes.UPDATE_WITHDRAWAL_FAILURE:
        case actionTypes.PROCESS_WITHDRAWAL_FAILURE:
            return {
                ...state,
                status: action.type,
                error: action.payload.error ? action.payload.error : "Couldn't save data",
            }
        case actionTypes.DELETE_WITHDRAWAL_SUCCESS:
            index = R.findIndex(R.propEq('id', action.payload.id))(state.withdrawals)
            if (index === -1) {
                return {
                    ...state,
                    status: action.type,
                }
            } else {
                return {
                    ...state,
                    status: action.type,
                    withdrawal: action.payload,
                    withdrawals: R.remove(index, 1, state.withdrawals)
                }
            }
        case actionTypes.DELETE_WITHDRAWAL_FAILURE:
            return {
                ...state,
                status: action.type,
                error: action.payload.error ? action.payload.error : "Couldn't delete data",
            }
        default:
            return state
    }
}

export default withdrawals
