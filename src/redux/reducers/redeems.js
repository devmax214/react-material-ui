import * as actionTypes from 'redux/actionTypes'
import * as R from 'ramda'

const initialState = {
    status: null,
    error: null,
    redeems: [],
    redeem: null,
}

function redeems(state = initialState, action) {
    let index
    switch (action.type) {
        case actionTypes.GET_POINTREDEEMS_REQUEST:
            return {
                ...state,
                status: action.type,
                redeems: [],
                error: null,
            }
        case actionTypes.GET_POINTREDEEMS_SUCCESS:
            return {
                ...state,
                status: action.type,
                redeems: action.payload,
            }
        case actionTypes.GET_POINTREDEEMS_FAILURE:
            return {
                ...state,
                status: action.type,
                error: action.payload.error ? action.payload.error : "Couldn't get data",
            }
        case actionTypes.GET_POINTREDEEM_REQUEST:
        case actionTypes.PROCESS_POINTREDEEM_REQUEST:
            return {
                ...state,
                status: action.type,
                redeem: null,
                error: null,
            }
        case actionTypes.GET_POINTREDEEM_SUCCESS:
            return {
                ...state,
                status: action.type,
                redeem: action.payload,
            }
        case actionTypes.GET_POINTREDEEM_FAILURE:
            return {
                ...state,
                status: action.type,
                error: action.payload.error ? action.payload.error : "Couldn't get data",
            }
        case actionTypes.PROCESS_POINTREDEEM_SUCCESS:
            index = R.findIndex(R.propEq('id', action.payload.id))(state.redeems)
            if (index === -1) {
                return {
                    ...state,
                    status: action.type,
                    redeem: action.payload.redeem,
                }
            } else {
                state.redeems[index] = action.payload.redeem
                return {
                    ...state,
                    status: action.type,
                    redeem: action.payload.redeem,
                    redeems: [...state.redeems]
                }
            }
        case actionTypes.PROCESS_POINTREDEEM_FAILURE:
            return {
                ...state,
                status: action.type,
                error: action.payload.error ? action.payload.error : "Couldn't get data",
            }
        case actionTypes.CREATE_POINTREDEEM_REQUEST:
            return {
                ...state,
                status: action.type,
                redeem: null,
                error: null,
            }
        case actionTypes.CREATE_POINTREDEEM_SUCCESS:
            return {
                ...state,
                status: action.type,
                redeem: action.payload,
                redeems: [...state.redeems, action.payload],
                error: null,
            }
        case actionTypes.CREATE_POINTREDEEM_FAILURE:
            return {
                ...state,
                status: action.type,
                error: action.payload.error ? action.payload.error : "Couldn't create redeem",
            }

        default:
            return state
    }
}

export default redeems
