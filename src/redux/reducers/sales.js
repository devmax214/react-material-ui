import * as actionTypes from 'redux/actionTypes'
import * as R from 'ramda'

const initialState = {
    status: null,
    error: null,
    sales: [],
    sale: null,
}

function sales(state = initialState, action) {
    let index

    switch (action.type) {
        case actionTypes.GET_SALES_REQUEST:
            return {
                ...state,
                status: actionTypes.GET_SALES_REQUEST,
                error: null,
            }
        case actionTypes.GET_SALES_SUCCESS:
            return {
                status: actionTypes.GET_SALES_SUCCESS,
                sales: action.payload,
                error: null,
            }
        case actionTypes.GET_SALES_FAILURE:
            return {
                ...initialState,
                status: actionTypes.GET_SALES_FAILURE,
                error: action.payload.error ? action.payload.error : "Couldn't get data",
            }
        case actionTypes.GET_SALE_SUCCESS:
            return {
                ...state,
                status: action.type,
                sale: action.payload,
            }
        case actionTypes.GET_SALE_FAILURE:
            return {
                ...state,
                status: action.type,
                error: action.payload.error ? action.payload.error : "Couldn't get data",
            }
        case actionTypes.GET_SALE_REQUEST:
        case actionTypes.CREATE_SALE_REQUEST:
        case actionTypes.UPDATE_SALE_REQUEST:
        case actionTypes.DELETE_SALE_REQUEST:
            return {
                ...state,
                status: action.type,
                sale: null,
                error: null,
            }
        case actionTypes.CREATE_SALE_SUCCESS:
            return {
                ...state,
                status: action.type,
                sale: action.payload,
                sales: [...state.sales, action.payload],
                error: null,
            }
        case actionTypes.CREATE_SALE_FAILURE:
            return {
                ...state,
                status: action.type,
                error: action.payload.error ? action.payload.error : "Couldn't create data",
            }
        case actionTypes.UPDATE_SALE_SUCCESS:
            index = R.findIndex(R.propEq('id', action.payload.id))(state.sales)
            if (index === -1) {
                return {
                    ...state,
                    status: action.type,
                    sale: action.payload,
                }
            } else {
                state.sales[index] = action.payload
                return {
                    ...state,
                    status: action.type,
                    sale: action.payload,
                    sales: [...state.sales]
                }
            }
        case actionTypes.UPDATE_SALE_FAILURE:
            return {
                ...state,
                status: action.type,
                error: action.payload.error ? action.payload.error : "Couldn't save data",
            }
        case actionTypes.DELETE_SALE_SUCCESS:
            index = R.findIndex(R.propEq('id', action.payload.id))(state.sales)
            if (index === -1) {
                return {
                    ...state,
                    status: action.type,
                }
            } else {
                return {
                    ...state,
                    status: action.type,
                    sale: action.payload,
                    sales: R.remove(index, 1, state.sales)
                }
            }
        case actionTypes.DELETE_SALE_FAILURE:
            return {
                ...state,
                status: action.type,
                error: action.payload.error ? action.payload.error : "Couldn't delete data",
            }
        default:
            return state
    }
}

export default sales
