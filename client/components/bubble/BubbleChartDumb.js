import  BubbleChartReact  from "./BubbleChartReact";
import React, {Component} from 'react'
var _ = require('lodash');


const rawdata = _.map(_.range(100), () => {
    return {
        v: _.random(10, 100)
    };
});


class BubbleChartDumb extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        console.log('rawdata??======', rawdata);
        return (
            <BubbleChartReact data={rawdata} />
        )
    }
}

export default BubbleChartDumb;