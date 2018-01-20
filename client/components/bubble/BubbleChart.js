import  BubbleCreate  from "./BubbleCreate";
import React, {Component} from 'react';
import {connect} from 'react-redux';
import { fetchCalories } from '../../store/calories';
var _ = require('lodash');

class BubbleChart extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentWillMount() {
        this.props.getAllCalories();
    }

    render() {
        const { allCalories } = this.props;
        const rawdata = _.map(allCalories, (food) => {
            return {
                name: food.name,
                calories: food.calories
            }
        });
        if(allCalories[0] !== undefined) {
            return (
                <BubbleCreate data={rawdata} />
            )
        }
        return (
            <div>
                Please Wait..
            </div>
        )
    }
}

const mapState = (state) => {
    return {
        allCalories: state.calories
    };
}

const mapDispatch = (dispatch, ownProps) => {
    return {
        getAllCalories () {
            dispatch(fetchCalories());
        }
    }
}


export default connect(mapState, mapDispatch)(BubbleChart);