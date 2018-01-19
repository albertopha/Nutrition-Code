import React from 'react';
import { Barcode, Result } from './Barcode';
import BarcodeSingleFood from './BarcodeSingleFood';

export class BarcodeFood extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scanning: false,
            upcCode: {},
            render: 0
        }
        this._scan = this._scan.bind(this);
        this.onDetect = this.onDetect.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        console.log(this.state.scanning, "=========", this.state.upcCode)
        const { scanning, upcCode, render  } = this.state;
        return (
            <div>
                <button onClick={this._scan}>{scanning ? 'Stop' : 'Start'}</button>
                <button type='submit' name='result' value={upcCode} onClick={this.handleSubmit}>Find</button>
                <ul className="upcCode">
                    {upcCode.codeResult&&<li>{upcCode.codeResult.code}</li>}
                </ul>
                {
                    render?<BarcodeSingleFood upcCode={this.state.upcCode.codeResult.code} />:null

                }
                {scanning ? <Barcode onDetected={this.onDetect} /> : null}
            </div>
        );
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log('submitted======', this.state.upcCode);
        this.setState({scanning: false, render: 1});
    }

    _scan() {
        this.setState({scanning: !this.state.scanning, render: 0, upcCode: {}});
    }

    onDetect(upcCode) {
        if(this.state.scanning){
            this.setState({scanning: false, upcCode});
        }
    }
}

export default BarcodeFood;