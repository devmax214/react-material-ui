import { connect } from 'react-redux'
import LandingPage from './LandingPage'
import { getProfile } from 'redux/actions'
import { push } from 'react-router-redux'

export default connect((state) => ({
    'profile': state.profile,
}), { push, getProfile })(LandingPage)
