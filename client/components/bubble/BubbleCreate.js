import React, {Component} from 'react';
import PropTypes from 'prop-types';
let d3 = require('d3');
var _ = require('lodash');


class BubbleCreate extends React.Component {

    constructor(props) {
        super(props);

        this.minValue = 1;
        this.maxValue = 100;
        this.mounted = false;

        this.state = {
            data: []
        };

        this.radiusScale = this.radiusScale.bind(this);
        this.simulatePositions = this.simulatePositions.bind(this);
        this.renderBubbles = this.renderBubbles.bind(this);
    }

    componentWillMount() {
        this.mounted = true;
    }

    componentDidMount() {
        if (this.props.data.length > 0) {
            this.minValue =
                0.95 *
                d3.min(this.props.data, item => {
                    return item.calories;
                });

            this.maxValue =
                1.05 *
                d3.max(this.props.data, item => {
                    return item.calories;
                });

            this.simulatePositions(this.props.data);
        }
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    radiusScale = value => {
        const fx = d3
            .scaleSqrt()
            .range([1, 100])
            .domain([this.minValue, this.maxValue]);

        return fx(value);
    };

    simulatePositions = data => {
        this.simulation = d3
            .forceSimulation()
            .nodes(data)
            .velocityDecay(0.5)
            .force("x", d3.forceX().strength(0.05))
            .force("y", d3.forceY().strength(0.05))
            .force(
                "collide",
                d3.forceCollide(d => {
                    return this.radiusScale(d.calories) + 2;
                })
            )
            .on("tick", () => {
                if (this.mounted) {
                    this.setState({ data });
                }
            });
    };

    renderBubbles = data => {
        const minValue =
            0.95 *
            d3.min(data, item => {
                return item.calories;
            });

        const maxValue =
            1.05 *
            d3.max(data, item => {
                return item.calories;
            });

        const color = d3
            .scaleLinear()
            .domain([minValue, maxValue])
            .interpolate(d3.interpolateHcl)
            .range(["#F8BBD0", "#AD1457"]);

        // render simple circle element
        console.log('useLables=====', this.props.useLabels);
        if (!this.props.useLabels) {
            const circles = _.map(data, (item, index) => {
                return (
                    <circle
                        key={index}
                        r={this.radiusScale(item.calories)}
                        cx={item.x}
                        cy={item.y}
                        fill={color(item.calories)}
                        stroke={d3.rgb(color(item.calories)).brighter(2)}
                        strokeWidth="2"
                    />
                );
            });

            return (
                <g
                    transform={`translate(${this.props.width / 2}, ${this.props
                        .height / 2})`}
                >
                    {circles}
                </g>
            );
        }

        // render circle and text elements inside a group
        const texts = _.map(data, (item, index) => {
            const props = this.props;
            const fontSize = this.radiusScale(item.calories) / 6;
            return (
                <g
                    key={index}
                    transform={`translate(${props.width / 2 +
                        item.x}, ${props.height / 2 + item.y})`}
                >
                    <circle
                        r={this.radiusScale(item.calories)}
                        fill={color(item.calories)}
                        stroke={d3.rgb(color(item.calories)).brighter(2)}
                        strokeWidth="2"
                    />
                    <text
                        dy="6"
                        fill="#fff"
                        textAnchor="middle"
                        fontSize={`${fontSize}px`}
                        fontWeight="bold"
                    >
                        {item.name + " " + item.calories}
                    </text>
                </g>
            );
        });
        return texts;
    };

    render() {
        if (this.state.data.length) {
            return (
                <svg width={this.props.width} height={this.props.height}>
                    {this.renderBubbles(this.state.data)}
                </svg>
            );
        }

        return <div>Loading</div>;
    }
}


BubbleCreate.propTypes = {
    data: PropTypes.array,
    width: PropTypes.number,
    height: PropTypes.number,
    useLabels: PropTypes.bool
};

BubbleCreate.defaultProps = {
    data: [],
    useLabels: true,
    width: 1224,
    height: 700
};


export default BubbleCreate;