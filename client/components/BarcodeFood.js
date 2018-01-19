import React from 'react';
import { Barcode, Result } from './Barcode';

export class BarcodeFood extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scanning: false,
            upcCode: {}
        }
        this._scan = this._scan.bind(this);
        this.onDetect = this.onDetect.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        console.log(this.state.scanning, "=========", this.state.upcCode)
        const { scanning, upcCode,  } = this.state;
        return (
            <div>
                <button onClick={this._scan}>{scanning ? 'Stop' : 'Start'}</button>
                <button type='submit' name='result' value={upcCode} onClick={this.handleSubmit}>Find</button>
                <ul className="upcCode">
                    {upcCode.codeResult&&<li>{upcCode.codeResult.code}</li>}
                </ul>
                {scanning ? <Barcode onDetected={this.onDetect} /> : null}
            </div>
        );
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log('submitted??', event.target.result);
        console.log('submitted======', this.state.upcCode);
        this.setState({scanning: false});
    }

    _scan() {
        this.setState({scanning: !this.state.scanning});
    }

    onDetect(upcCode) {
        console.log('infinite loop? =======')
        if(this.state.scanning){
            console.log('????????')
            this.setState({scanning: false, upcCode});
        }
    }
}

export default BarcodeFood;