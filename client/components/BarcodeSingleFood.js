import React from 'react';
import {connect} from 'react-redux';
import { fetchUPCFood } from '../store/barcodeFood';
import BubbleChart from './BubbleChart';

export class BarcodeSingleFood extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentWillMount() {
        console.log('am I in here??????', this.props.upcCode);
        this.props.fetchSingleFood(this.props.upcCode);
    }

    render() {
        const { singleFood } = this.props;
        console.log('when do I get here????', singleFood.Data);

        return (
            <div>
                <h1>Hello I'm in Barcode Single Food</h1>
                <h2>
                    {
                        singleFood.Description
                    }
                </h2>
                <div>
                {
                    singleFood.Data? <BubbleChart singleFood={singleFood.Data.Fat} />:null
                }
                </div>
            </div>
        );
    }
}
/**
 * CONTAINER
 */
const mapState = (state, ownProps) => {
  return {
    singleFood: state.barcodeFood,
    upcCode: ownProps.upcCode
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchSingleFood(upcCode) {
        dispatch(fetchUPCFood(upcCode));
    }
  }
}

export default connect(mapState, mapDispatch)(BarcodeSingleFood)