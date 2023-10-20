import { connect } from 'react-redux'
import PointSales from './PointSales.jsx'
import { getPointSales } from 'redux/actions'
import { push } from 'react-router-redux'

export default connect((state) => ({
    'pointSales': state.points.pointSales,
}), { getPointSales, push })(PointSales)