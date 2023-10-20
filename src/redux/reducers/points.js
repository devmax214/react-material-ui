import * as actionTypes from 'redux/actionTypes'
import * as R from 'ramda'

const initialState = {
    status: null,
    error: null,
    points: [],
    pointSales: [],
    pointSale: null
}

function points(state = initialState, action) {
    let index

    switch (action.type) {
        case actionTypes.GET_POINTS_REQUEST:
        case actionTypes.CREATE_POINTSALE_REQUEST:
        case actionTypes.GET_POINTSALE_REQUEST:
        case actionTypes.GET_POINTSALES_REQUEST:
            return {
                ...state,
                status: action.type,
                error: null,
            }
        case actionTypes.GET_POINTS_SUCCESS:
            return {
                ...state,
                status: actionTypes.GET_POINTS_SUCCESS,
                points: action.payload,
                error: null,
            }
        case actionTypes.GET_POINTS_FAILURE:
            return {
                ...initialState,
                status: actionTypes.GET_POINTS_FAILURE,
                error: action.payload.error ? action.payload.error : "Couldn't get data",
            }
        case actionTypes.GET_POINTSALE_SUCCESS:
            return {
                ...state,
                status: actionTypes.GET_POINTSALE_SUCCESS,
                pointSale: action.payload,
                error: null,
            }
        case actionTypes.GET_POINTSALE_FAILURE:
            return {
                ...initialState,
                status: actionTypes.GET_POINTSALE_FAILURE,
                error: action.payload.error ? action.payload.error : "Couldn't get data",
            }
        case actionTypes.GET_POINTSALES_SUCCESS:
            return {
                ...state,
                status: actionTypes.GET_POINTSALES_SUCCESS,
                pointSales: action.payload,
                error: null,
            }
        case actionTypes.GET_POINTSALES_FAILURE:
            return {
                ...initialState,
                status: actionTypes.GET_POINTSALES_FAILURE,
                error: action.payload.error ? action.payload.error : "Couldn't get data",
            }
        case actionTypes.PROCESS_POINTSALE_SUCCESS:
            index = R.findIndex(R.propEq('id', action.payload.id))(state.points)
            if (index === -1) {
                return {
                    ...state,
                    status: action.type,
                    pointSale: action.payload.pointSale,
                }
            } else {
                state.pointSales[index] = action.payload.pointSale
                return {
                    ...state,
                    status: action.type,
                    pointSale: action.payload.pointSale,
                    pointSales: [...state.pointSales]
                }
            }
        case actionTypes.PROCESS_POINTSALE_FAILURE:
            return {
                ...state,
                status: action.type,
                error: action.payload.error ? action.payload.error : "Couldn't save data",
            }
        case actionTypes.CREATE_POINTSALE_SUCCESS:
            return {
                ...state,
                status: action.type,
                pointSale: action.payload,
                pointSales: [...state.pointSales, action.payload],
                error: null,
            }
        case actionTypes.CREATE_POINTSALE_FAILURE:
            return {
                ...state,
                status: action.type,
                error: action.payload.error ? action.payload.error : "Couldn't create sale",
            }
        default:
            return state
    }
}

export default points
