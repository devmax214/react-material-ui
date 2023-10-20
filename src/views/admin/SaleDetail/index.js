import { connect } from 'react-redux'
import SaleDetail from './SaleDetail.jsx'
import { getSale, updateSale } from 'redux/actions'
import { push } from 'react-router-redux'

export default connect((state) => ({
    'sales': state.sales,
}), { getSale, updateSale, push })(SaleDetail)