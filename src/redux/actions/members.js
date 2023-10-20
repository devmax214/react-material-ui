import * as actionTypes from 'redux/actionTypes'
import api from 'utils/api'

export const getMembers = () => async (dispatch) => {
    dispatch({ type: actionTypes.GET_MEMBERS_REQUEST })

    const response = await api.get('/members')

    if (response.status === 200) {
        dispatch({ type: actionTypes.GET_MEMBERS_SUCCESS, payload: response.data })
    } else {
        dispatch({ type: actionTypes.GET_MEMBERS_FAILURE, payload: response })
    }
}

export const getMember = (id) => async (dispatch) => {
    dispatch({ type: actionTypes.GET_MEMBER_REQUEST })

    const response = await api.get(`/members/${id}`)

    if (response.status === 200) {
        dispatch({ type: actionTypes.GET_MEMBER_SUCCESS, payload: response.data })
    } else {
        dispatch({ type: actionTypes.GET_MEMBER_FAILURE, payload: response })
    }
}

export const createMember = (member) => async (dispatch) => {
    dispatch({ type: actionTypes.CREATE_MEMBER_REQUEST })

    const response = await api.post('/members', member)

    if (response.status === 201) {
        dispatch({ type: actionTypes.CREATE_MEMBER_SUCCESS, payload: response.data })
    } else {
        dispatch({ type: actionTypes.CREATE_MEMBER_FAILURE, payload: response })
    }
}

export const registerMember = (member) => async (dispatch) => {
    dispatch({ type: actionTypes.REGISTER_MEMBER_REQUEST })

    const response = await api.post('/members/register', member)

    if (response.status === 201) {
        dispatch({ type: actionTypes.REGISTER_MEMBER_SUCCESS, payload: response.data })
    } else {
        dispatch({ type: actionTypes.REGISTER_MEMBER_FAILURE, payload: response })
    }
}

export const updateMember = ({ id, ...member }) => async (dispatch) => {
    dispatch({ type: actionTypes.UPDATE_MEMBER_REQUEST })

    const response = await api.put(`/members/${id}`, member)

    if (response.status === 200) {
        dispatch({ type: actionTypes.UPDATE_MEMBER_SUCCESS, payload: response.data })
    } else {
        dispatch({ type: actionTypes.UPDATE_MEMBER_FAILURE, payload: response })
    }
}

export const deleteMember = (id) => async (dispatch) => {
    dispatch({ type: actionTypes.DELETE_MEMBER_REQUEST })

    const response = await api.delete(`/members/${id}`)

    if (response.status === 200) {
        dispatch({ type: actionTypes.DELETE_MEMBER_SUCCESS, payload: { id } })
    } else {
        dispatch({ type: actionTypes.DELETE_MEMBER_FAILURE, payload: response })
    }
}

export const getMemberIncomes = (id) => async (dispatch) => {
    dispatch({ type: actionTypes.GET_MEMBER_INCOMES_REQUEST })

    const response = await api.get(`/members/${id}/incomes`)

    if (response.status === 200) {
        const { incomes, ...member } = response.data
        dispatch({ type: actionTypes.GET_MEMBER_INCOMES_SUCCESS, payload: { incomes, member } })
    } else {
        dispatch({ type: actionTypes.GET_MEMBER_INCOMES_FAILURE, payload: response })
    }
}

export const getMemberPoints = (id) => async (dispatch) => {
    dispatch({ type: actionTypes.GET_MEMBER_POINTS_REQUEST })

    const response = await api.get(`/members/${id}/points`)

    if (response.status === 200) {
        const { points, ...member } = response.data
        dispatch({ type: actionTypes.GET_MEMBER_POINTS_SUCCESS, payload: { points, member } })
    } else {
        dispatch({ type: actionTypes.GET_MEMBER_POINTS_FAILURE, payload: response })
    }
}

export const getMemberWithdrawals = (id) => async (dispatch) => {
    dispatch({ type: actionTypes.GET_MEMBER_WITHDRAWALS_REQUEST })

    const response = await api.get(`/members/${id}/withdrawals`)

    if (response.status === 200) {
        const { withdrawals, ...member } = response.data
        dispatch({ type: actionTypes.GET_MEMBER_WITHDRAWALS_SUCCESS, payload: { withdrawals, member } })
    } else {
        dispatch({ type: actionTypes.GET_MEMBER_WITHDRAWALS_FAILURE, payload: response })
    }
}

export const getMemberSales = (id) => async (dispatch) => {
    dispatch({ type: actionTypes.GET_MEMBER_SALES_REQUEST })

    const response = await api.get(`/members/${id}/sales`)

    if (response.status === 200) {
        const { sales, ...member } = response.data
        dispatch({ type: actionTypes.GET_MEMBER_SALES_SUCCESS, payload: { sales, member } })
    } else {
        dispatch({ type: actionTypes.GET_MEMBER_SALES_FAILURE, payload: response })
    }
}

export const getMemberRefers = (id) => async (dispatch) => {
    dispatch({ type: actionTypes.GET_MEMBER_REFERS_REQUEST })

    const response = await api.get(`/members/${id}/refers`)

    if (response.status === 200) {
        const { referers, ...member } = response.data
        dispatch({ type: actionTypes.GET_MEMBER_REFERS_SUCCESS, payload: { referers, member } })
    } else {
        dispatch({ type: actionTypes.GET_MEMBER_REFERS_FAILURE, payload: response })
    }
}

export const getMemberPointRedeems = (id) => async (dispatch) => {
    dispatch({ type: actionTypes.GET_MEMBER_POINTREDEEMS_REQUEST })

    const response = await api.get(`/members/${id}/redeems`)

    if (response.status === 200) {
        const { redeems, ...member } = response.data
        dispatch({ type: actionTypes.GET_MEMBER_POINTREDEEMS_SUCCESS, payload: { redeems, member } })
    } else {
        dispatch({ type: actionTypes.GET_MEMBER_POINTREDEEMS_FAILURE, payload: response })
    }
}

export const getMemberPointSales = (id) => async (dispatch) => {
    dispatch({ type: actionTypes.GET_MEMBER_POINTSALES_REQUEST })

    const response = await api.get(`/members/${id}/pointSales`)

    if (response.status === 200) {
        const { point_sales, ...member } = response.data
        dispatch({ type: actionTypes.GET_MEMBER_POINTSALES_SUCCESS, payload: { pointSales: point_sales, member } })
    } else {
        dispatch({ type: actionTypes.GET_MEMBER_POINTSALES_FAILURE, payload: response })
    }
}
