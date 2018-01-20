import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import { fetchFoods } from '../store/foods'
import BottomNav from './BottomNav';
let d3 = require('d3')

export class BubbleChart extends React.Component{
    constructor(props) {
        super(props);
        this.state = {

        }
        this.testingd3 = this.testingd3.bind(this)
    }

    // componentWillMount() {
    //     this.props.fetchAllFoods();
    // }

    componentDidMount() {
        this.testingd3();
    }

    testingd3() {
        console.log("I reached here! =========")
        d3.selectAll("h1").style("color", function() {
          return "hsl(" + Math.random() * 360 + ",100%,50%)";
        });
    }

    render() {
        let colors = ['#FD9827', '#DA3B21', '#3669C9', '#1D9524'];
        const { singleFood } = this.props;
        console.log('singleFood =========', singleFood);
        let data = [];
        singleFood? data = [
            {name: "Saturated Fat", count: singleFood.SaturatedFat},
            {name: "Monosaturated Fat", count: singleFood.MonosaturatedFat},
            {name: "Total Lipid", count: singleFood.TotalLipid},
            {name: "Polysaturated Fat", count: singleFood.PolysaturatedFat}
        ]: data = []

        const { width, height, foods, title } = this.props;
        console.log('where are all my foods', foods);
        return (
            <div>
                <h1>{title}</h1>
                {
                    singleFood?  <Chart width={width} height={height}>
                        <DataSeries data={data} colors={colors} width={width} height={height}/>
                    </Chart>: <h1>CHART IS EMPTY</h1>
                }
                <BottomNav />
            </div>
        )
    }

}


BubbleChart.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    title: PropTypes.string,
    data: PropTypes.array.isRequired
};

BubbleChart.defaultProps = {
    width: 300,
    height: 350,
    title: 'FAT CHART',
    Legend: true
};



/*********** Chart ************/


class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    };

    render() {
        const { width, height, children } = this.props;
        return (
            <svg width={width} height={height}>
            {children}</svg>
        )
    }
}

Chart.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    children: PropTypes.node
};

/*********** Data Series ************/


class DataSeries extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        };
    };

    render() {
        const { colors, data, width, height } = this.props;
        let pie = d3.pie(),
        result = data.map(item => item.count),
        names = data.map(item => item.name),
        sum = result.reduce((memo, num) => memo + num, 0),
        position = "translate(" + (width)/2 + "," + (height)/2 + ")";

        console.log('sum ======', sum, colors);

        let bars = (pie(result)).map((point, i) => {
            return (
                <Sector data={point} ind={i} name={names[i]} colors={colors} total=  
                {sum} width={width} height={height}/>
            )
          });
        return (
            <g transform={position}>{bars}</g>
        )
    }
}

DataSeries.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    colors: PropTypes.array,
    data: PropTypes.array.isRequired
}

/*********** Sector ************/
class Sector extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        }
        this.onMouseOver = this.onMouseOver.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    render() {
        const { data, colors, width, ind } = this.props;
        // console.log("I'm in  SECTOR ========", colors, ind);

        let outerRadius = width/2.2,
        innerRadius = width/8,
        arc = d3.arc()
        .outerRadius(outerRadius)
        .innerRadius(innerRadius),
        center = "translate(" + arc.centroid(data) + ")",
        percentCenter = "translate(0,3)";

        return (
            <g onClick={this.onClick} onMouseOut={this.onMouseOut} onMouseOver={this.onMouseOver} >
                <path className={this.state.opacity} fill={colors[ind]} d={arc(data)}></path>
                <text fill="white" transform={center} textAnchor="middle"          
                    fontSize="15px">{data.value}
                </text>
                <text fill={colors[ind]} stroke={colors} fontSize="15px" transform={percentCenter} textAnchor="middle">{this.state.text}</text>
            </g>
        )
    }

    onClick() {
        alert(this.props.name);
    }

    onMouseOut() {
        console.log('onMouseOut======');
        this.setState({text: '', opacity:'arc'});
    }

    onMouseOver(event) {
        console.log('onMouseOver=====',event, this.props.data.value)
        this.setState({text: '', opacity:'arc-hover'});
        var percent = (this.props.data.value/this.props.total)*100;
        percent = percent.toFixed(1);
        this.setState({text: percent + " %"});
    }

}

// let data = [
//     {name: "Apples", count: 10},
//     {name: "Oranges", count: 40},
//     {name: "Bananas", count: 5},
//     {name: "Blueberries", count: 100},
//     {name: "mangoes ", count: 29},
//     {name: "WTF", count: 100}
// ];


export default BubbleChart;

