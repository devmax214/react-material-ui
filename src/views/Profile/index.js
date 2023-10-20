import { connect } from 'react-redux'
import Profile from './Profile'
import { getProfile, saveProfile } from 'redux/actions'
import { push } from 'react-router-redux'

export default connect((state) => ({
    'profile': state.profile,
}), { push, getProfile, saveProfile })(Profile)
