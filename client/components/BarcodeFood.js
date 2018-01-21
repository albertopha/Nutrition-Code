import React from 'react';
import { Barcode, Result } from './Barcode';
import BarcodeSingleFood from './BarcodeSingleFood';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
    margin: 12,
    fill: '#D81B60'
  };



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
        const { scanning, upcCode, render  } = this.state;
        return (
            <div className='barcode-food-p'>
                <h1 className="barcode-food-h1">Scan your barcode</h1>
                <div className='barcode-food'>
                    <RaisedButton icon={<svg fill="#FFFFFF" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 3L7.17 5H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2h-3.17L15 3H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/>
                    <path d="M0 0h24v24H0V0z" fill="#D81B60"/>
                    <path d="M12 17l1.25-2.75L16 13l-2.75-1.25L12 9l-1.25 2.75L8 13l2.75 1.25z"/>
                </svg>} label={scanning ? 'Stop' : 'Start'} style={style} onClick={this._scan}></RaisedButton>
                    <RaisedButton icon={<svg fill="#FFFFFF" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0h24v24H0z" fill="#D81B60"/>
                    <path d="M20 19.59V8l-6-6H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c.45 0 .85-.15 1.19-.4l-4.43-4.43c-.8.52-1.74.83-2.76.83-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5c0 1.02-.31 1.96-.83 2.75L20 19.59zM9 13c0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3-3 1.34-3 3z"/>
                </svg>} label="Find" style={style} type='submit' name='result' value={upcCode} onClick={this.handleSubmit}></RaisedButton>
                    <ul className="upcCode">
                        {upcCode.codeResult&&<li>{upcCode.codeResult.code}</li>}
                    </ul>
                    {
                        render?<BarcodeSingleFood upcCode={this.state.upcCode.codeResult.code} />:null

                    }
                    {scanning ? <Barcode onDetected={this.onDetect} /> : null}
                </div>
            </div>
        );
    }

    handleSubmit(event) {
        event.preventDefault();
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