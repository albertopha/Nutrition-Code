import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_UPCFOOD = 'GET_UPCFOOD';

/**
 * INITIAL STATE
 */
const defaultFoods = {}

/**
 * ACTION CREATORS
 */
const getUPCFood = upcFood => ({type: GET_UPCFOOD, upcFood});

/**
 * THUNK CREATORS
 */

export const fetchUPCFood = (upcCode) =>
  dispatch =>
      axios.get('/api/foods/upcfood')
        .then(res => res.data)
        .then(data => {
            let food = data.foods.find(food => food.upcCode === upcCode)
            dispatch(getUPCFood(food))
        })
      .catch(err => console.log(err))
/**
 * REDUCER
 */
export default function (state = defaultFoods, action) {
  switch (action.type) {
    case GET_UPCFOOD:
      return action.upcFood;
    default:
      return state;
  }
}
