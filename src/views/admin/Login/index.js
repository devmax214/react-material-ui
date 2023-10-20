import { connect } from 'react-redux'
import Login from './Login'
import { loginAdmin } from 'redux/actions'
import { push } from 'react-router-redux'
import { withRouter } from 'react-router-dom'

export default connect((state) => ({
    'auth': state.auth,
}), { loginAdmin, push })(withRouter(Login))
