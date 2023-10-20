import { connect } from 'react-redux'
import UserCreate from './UserCreate.jsx'
import { createUser } from 'redux/actions'
import { push } from 'react-router-redux'

export default connect((state) => ({
    'users': state.users,
}), { createUser, push })(UserCreate)