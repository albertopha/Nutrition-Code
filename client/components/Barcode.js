import React from 'react';
import Quagga from 'quagga';
import PropTypes from 'prop-types'

export class Barcode extends React.Component {
    constructor(props) {
        super(props);
        this._onDetected = this._onDetected.bind(this);
    }

    componentDidMount() {
        console.log('3=======')
        Quagga.init({
            inputStream: {
                type : "LiveStream",
                constraints: {
                    width: 640,
                    height: 480,
                    facing: "environment" // or user
                }
            },
            locator: {
                patchSize: "medium",
                halfSample: true
            },
            numOfWorkers: 2,
            decoder: {
                readers : [ "upc_reader"]
            },
            locate: true
        }, function(err) {
            if (err) {
                return console.log(err);
            }
            console.log("Initialization finished. Ready to start");
            Quagga.start();
        });
        Quagga.onDetected(this._onDetected);
    }

    componentWillMount() {
        console.log('2========')
        Quagga.offDetected(this._onDetected);
    }

    render() {
        return (
            <div id="interactive" className="viewport"/>
        );
    }

    _onDetected(result) {
        console.log('1========', result)
        this.props.onDetected(result);
        Quagga.offDetected(this._onDetected);
    }
}

Barcode.propTypes = {
    onDetected: PropTypes.func.isRequired
}