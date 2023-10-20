import { connect } from 'react-redux'
import PointItemCreate from './PointItemCreate.jsx'
import { createPointItem } from 'redux/actions'
import { push } from 'react-router-redux'

export default connect((state) => ({
    'items': state.items,
}), { createPointItem, push })(PointItemCreate)