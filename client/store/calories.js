import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CALORIES = 'GET_CALORIES';

/**
 * INITIAL STATE
 */
const defaultCalories = []

/**
 * ACTION CREATORS
 */
const getCalories = calories => ({type: GET_CALORIES, calories});

/**
 * THUNK CREATORS
 */

export const fetchCalories = () =>
  dispatch =>
      axios.get('/api/foods/calories')
        .then(res => res.data)
        .then(data => {
            console.log('all calories =====', data);
            dispatch(getCalories(data));
        })
      .catch(err => console.log(err))
/**
 * REDUCER
 */
export default function (state = defaultCalories, action) {
  switch (action.type) {
    case GET_CALORIES:
      return action.calories;
    default:
      return state;
  }
}
