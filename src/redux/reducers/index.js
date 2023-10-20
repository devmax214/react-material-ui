import { combineReducers } from 'redux'
// import { routerReducer } from 'react-router-redux'
import auth from './auth'
import members from './members'
import sales from './sales'
import withdrawals from './withdrawals'
import users from './users'
import settings from './settings'
import dashboard from './dashboard'
import profile from './profile'
import incomes from './incomes'
import points from './points'
import redeems from './redeems'
import announcements from './announcements'
import items from './items'

const rootReducer = combineReducers({
    auth,
    members,
    sales,
    withdrawals,
    users,
    settings,
    dashboard,
    profile,
    incomes,
    points,
    redeems,
    announcements,
    items,
    // router: routerReducer,
})

export default rootReducer
