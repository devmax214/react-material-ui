import { connect } from 'react-redux'
import UserDetail from './UserDetail.jsx'
import { getUser, updateUser } from 'redux/actions'
import { push } from 'react-router-redux'

export default connect((state) => ({
    'users': state.users,
}), { getUser, updateUser, push })(UserDetail)