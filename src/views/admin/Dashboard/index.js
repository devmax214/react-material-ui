import { connect } from 'react-redux'
import Dashboard from './Dashboard.jsx'
import { getDashboardData } from 'redux/actions'
import { push } from 'react-router-redux'

export default connect((state) => ({
    'dashboard': state.dashboard.dashboard,
}), { getDashboardData, push })(Dashboard)