import { connect } from 'react-redux'
import PointItems from './PointItems.jsx'
import { getPointItems, deletePointItem } from 'redux/actions'
import { push } from 'react-router-redux'

export default connect((state) => ({
    'items': state.items.items,
}), { getPointItems, deletePointItem, push })(PointItems)