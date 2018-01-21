import React from 'react';
import {connect} from 'react-redux';
import { fetchUPCFood } from '../store/barcodeFood';
import SingleChart from './SingleChart';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
  } from 'material-ui/Table';

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
        let mineralList = [], vitaminList = [];
        if(singleFood.Data){
             mineralList = Object.keys(singleFood.Data.minerals);
             vitaminList = Object.keys(singleFood.Data.Vitamins);
        }

        return (
            <div className="single-food">
                <div className="single-food-left">
                    <div>
                        <h1>
                        {
                            singleFood.Description
                        }
                        </h1>
                    </div>
                    <div>
                        {
                            <img className="single-food-img" src={singleFood.imageUrl} />
                        }
                    </div>
                    <div>
                    {
                        singleFood.Data? <SingleChart singleFood={singleFood.Data.Fat} />:null
                    }
                    </div>
                </div>

                <div className="single-food-right">
                    <div>
                        <h1>Details</h1>
                    </div>
                    <div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHeaderColumn>Name</TableHeaderColumn>
                                    <TableHeaderColumn>value</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    singleFood.Data&&mineralList.map(key => {
                                        return (
                                            <TableRow>
                                                <TableRowColumn>{key}</TableRowColumn>
                                                <TableRowColumn>{singleFood.Data.minerals[key]}</TableRowColumn>
                                            </TableRow>
                                        )
                                    })
                                }
                                {
                                    singleFood.Data&&vitaminList.map(key => {
                                        return (
                                            <TableRow>
                                                <TableRowColumn>{key}</TableRowColumn>
                                                <TableRowColumn>{singleFood.Data.Vitamins[key]}</TableRowColumn>
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </div>
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