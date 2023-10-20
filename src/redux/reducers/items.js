import * as actionTypes from 'redux/actionTypes'
import * as R from 'ramda'

const initialState = {
    status: null,
    error: null,
    items: [],
    item: null,
}

function items(state = initialState, action) {
    let index

    switch (action.type) {
        case actionTypes.CREATE_POINTITEM_REQUEST:
        case actionTypes.UPDATE_POINTITEM_REQUEST:
        case actionTypes.GET_POINTITEM_REQUEST:
        case actionTypes.DELETE_POINTITEM_REQUEST:
        case actionTypes.GET_POINTITEMS_REQUEST:
            return {
                ...state,
                status: action.type,
                error: null,
            }
        case actionTypes.GET_POINTITEMS_SUCCESS:
            return {
                ...state,
                status: actionTypes.GET_POINTITEMS_SUCCESS,
                items: action.payload,
                error: null,
            }
        case actionTypes.GET_POINTITEMS_FAILURE:
            return {
                ...initialState,
                status: actionTypes.GET_POINTITEMS_FAILURE,
                error: action.payload.error ? action.payload.error : "Couldn't get data",
            }
        case actionTypes.GET_POINTITEM_SUCCESS:
            return {
                ...state,
                status: actionTypes.GET_POINTITEM_SUCCESS,
                item: action.payload,
                error: null,
            }
        case actionTypes.GET_POINTITEM_FAILURE:
            return {
                ...initialState,
                status: actionTypes.GET_POINTITEMS_FAILURE,
                error: action.payload.error ? action.payload.error : "Couldn't get data",
            }
        case actionTypes.CREATE_POINTITEM_SUCCESS:
            return {
                ...state,
                status: action.type,
                user: action.payload,
                items: [...state.items, action.payload],
                error: null,
            }
        case actionTypes.CREATE_POINTITEM_FAILURE:
            return {
                ...state,
                status: action.type,
                error: action.payload.error ? action.payload.error : "Couldn't create data",
            }
        case actionTypes.UPDATE_POINTITEM_SUCCESS:
            index = R.findIndex(R.propEq('id', action.payload.id))(state.items)
            if (index === -1) {
                return {
                    ...state,
                    status: action.type,
                    item: action.payload,
                }
            } else {
                state.items[index] = action.payload
                return {
                    ...state,
                    status: action.type,
                    item: action.payload,
                    items: [...state.items]
                }
            }
        case actionTypes.UPDATE_POINTITEM_FAILURE:
            return {
                ...state,
                status: action.type,
                error: action.payload.error ? action.payload.error : "Couldn't save data",
            }
        case actionTypes.DELETE_POINTITEM_SUCCESS:
            index = R.findIndex(R.propEq('id', action.payload.id))(state.items)
            if (index === -1) {
                return {
                    ...state,
                    status: action.type,
                }
            } else {
                return {
                    ...state,
                    status: action.type,
                    item: action.payload,
                    items: R.remove(index, 1, state.items)
                }
            }
        case actionTypes.DELETE_POINTITEM_FAILURE:
            return {
                ...state,
                status: action.type,
                error: action.payload.error ? action.payload.error : "Couldn't delete data",
            }
        default:
            return state
    }
}

export default items
