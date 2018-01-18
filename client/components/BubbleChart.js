import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import { fetchFoods } from '../store/foods'

export class BubbleChart extends React.Component{
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentWillMount() {
        this.props.fetchAllFoods();
    }

    render() {
        console.log('where are all my foods', this.props.foods)
        return (
            <h1>BUBBLE CHART</h1>
        )
    }

}

/**
 * CONTAINER
 */
const mapState = (state) => {
    return {
        foods: state.foods
    }
}

const mapDispatch = (dispatch) => {
    return {
        fetchAllFoods() {
            dispatch(fetchFoods())
        }
    }
}

export default connect(mapState, mapDispatch)(BubbleChart)
// export default BubbleChart

/**
 * PROP TYPES
 */
// BubbleChart.propTypes = {

// }
