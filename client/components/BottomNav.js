import React from 'react';
import {withRouter, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';





/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
const BottomNav = () => {

  return (
    <div>
        <Paper zDepth={5} style={{backgroundColor: 'white'}}>
            <div className="bottom-nav">
                <Link to="/" style={{color: '#E30B5C'}}>Home</Link>
                <Link to="/bubble-chart" style={{color: '#E30B5C'}}>Calories</Link>
                <Link to="/daily-progress" style={{color: '#E30B5C'}}>Daily Progress</Link>
                <Link to="/scan" style={{color: '#E30B5C'}}>Scan Product</Link>
            </div>
        </Paper>
    </div>
  )
}

export default withRouter(connect(null, null)(BottomNav));
