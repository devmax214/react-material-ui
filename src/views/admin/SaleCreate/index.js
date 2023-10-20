import { connect } from 'react-redux'
import SaleCreate from './SaleCreate.jsx'
import { getMembers, createSale } from 'redux/actions'
import { push } from 'react-router-redux'

export default connect((state) => ({
    'sales': state.sales,
    'members': state.members.members,
}), { getMembers, createSale, push })(SaleCreate)