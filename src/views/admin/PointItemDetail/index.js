import { connect } from 'react-redux'
import PointItemDetail from './PointItemDetail.jsx'
import { getPointItem, updatePointItem } from 'redux/actions'
import { push } from 'react-router-redux'

export default connect((state) => ({
    'items': state.items,
}), { getPointItem, updatePointItem, push })(PointItemDetail)