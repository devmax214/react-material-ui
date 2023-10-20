import { connect } from 'react-redux'
import SaleList from './SaleList.jsx'
import { getSales, deleteSale } from 'redux/actions'
import { push } from 'react-router-redux'

export default connect((state) => ({
    'sales': state.sales.sales,
}), { getSales, deleteSale, push })(SaleList)