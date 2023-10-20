import * as actionTypes from 'redux/actionTypes'
import * as R from 'ramda'

const initialState = {
    status: null,
    error: null,
    member: [],
    incomes: [],
    points: [],
    sales: [],
    referers: [],
    withdrawals: [],
    redeems: [],
    announcements: [],
    pointSales: [],
}

function profile(state = initialState, action) {
    let index
    switch (action.type) {
        case actionTypes.CHECKED_ANNOUNCEMENT_REQUEST:
            return {
                ...state,
                status: action.type,
                error: null,
            }
        case actionTypes.CHECKED_ANNOUNCEMENT_SUCCESS:
            index = R.findIndex(R.propEq('id', action.payload.id))(state.announcements)
            if (index === -1) {
                return {
                    ...state,
                    status: action.type,
                }
            } else {
                return {
                    ...state,
                    status: action.type,
                    announcements: R.remove(index, 1, state.announcements)
                }
            }
        case actionTypes.CHECKED_ANNOUNCEMENT_FAILURE:
            return {
                ...initialState,
                status: action.type,
                error: action.payload.error ? action.payload.error : "Couldn't save data",
            }
        case actionTypes.GET_PROFILE_REQUEST:
            return {
                ...initialState,
                status: action.type,
                error: null,
            }
        case actionTypes.GET_PROFILE_SUCCESS:
            const { incomes, points, sales, referers, withdrawals, redeems, announcements, point_sales, ...member } = action.payload
            return {
                status: action.type,
                incomes, points, sales, referers, withdrawals, redeems, announcements, member, pointSales: point_sales,
            }
        case actionTypes.GET_PROFILE_FAILURE:
            return {
                ...state,
                status: action.type,
                error: action.payload.error ? action.payload.error : "Couldn't get data",
            }
        case actionTypes.SAVE_PROFILE_REQUEST:
            return {
                ...state,
                status: action.type,
                error: null,
            }
        case actionTypes.SAVE_PROFILE_SUCCESS:
            return {
                ...state,
                status: action.type,
                member: action.payload,
            }
        case actionTypes.SAVE_PROFILE_FAILURE:
            return {
                ...state,
                status: action.type,
                error: action.payload.error ? action.payload.error : "Couldn't save data",
            }
        case actionTypes.CREATE_WITHDRAWAL_SUCCESS:
            return {
                ...state,
                withdrawals: [...state.withdrawals, action.payload],
            }
        case actionTypes.CREATE_POINTSALE_SUCCESS:
            return {
                ...state,
                pointSales: [...state.pointSales, action.payload],
            }
        case actionTypes.CREATE_POINTREDEEM_SUCCESS:
            return {
                ...state,
                redeems: [...state.redeems, action.payload],
            }
        default:
            return state
    }
}

export default profile