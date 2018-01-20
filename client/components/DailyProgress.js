import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
let d3 = require('d3')

export class DailyProgress extends React.Component{
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    // componentDidMount() {
    //     var dom =  ReactDOM.findDOMNode(this);
    //     createChart(dom, this.props);
    // }

    // shouldComponentUpdate() {
    //     var dom =  ReactDOM.findDOMNode(this);
    //     createChart(dom, this.props);
    //     return false;
    // }

    render() {
        return (
            <div className='daily-progress'>
                <h4> {this.props.title} </h4>
            </div>
        )
    }

}


DailyProgress.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    title: PropTypes.string,
    data: PropTypes.array.isRequired
};

DailyProgress.defaultProps = {
    width: 300,
    height: 350,
    title: 'DAILY PROGRESS',
    Legend: true
};

export default DailyProgress;