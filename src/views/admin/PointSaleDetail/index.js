import { connect } from 'react-redux'
import PointSaleDetail from './PointSaleDetail.jsx'
import { getPointSale, processpointSale } from 'redux/actions'
import { push } from 'react-router-redux'

export default connect((state) => ({
    'pointSale': state.points,
}), { getPointSale, processpointSale, push })(PointSaleDetail)