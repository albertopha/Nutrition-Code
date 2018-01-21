import React from 'react'
import Navbar from './Navbar'
import Paper from 'material-ui/Paper';

const style = {
  height: 100,
  width: 100,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
  backgroundColor:'black'
};

export const Frontpage = (props) => {

  return (
    <div className="frontPageContainer">
      
      <div>
        <Paper style={style} zDepth={5} circle={true} />
      </div>
      <h1>TO EAT OR NOT TO EAT THAT IS THE QUESTION</h1>
    </div>
  )
}

export default Frontpage
