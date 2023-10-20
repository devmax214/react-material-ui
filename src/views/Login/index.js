import { connect } from 'react-redux'
import Login from './Login'
import { login } from 'redux/actions'
import { push } from 'react-router-redux'
import { withRouter } from 'react-router-dom'

export default connect((state) => ({
    'auth': state.auth,
}), { login, push })(withRouter(Login))
