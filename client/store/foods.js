import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_FOODS = 'GET_FOODS'

/**
 * INITIAL STATE
 */
const defaultFoods = {}

/**
 * ACTION CREATORS
 */
const getFoods = foods => ({type: GET_FOODS, foods})

/**
 * THUNK CREATORS
 */

export const fetchFoods = () =>
  dispatch =>
    axios.get('/api/foods')
      .then(res => res.data)
      .then(foods => {
          dispatch(getFoods(foods))
      })
      .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = defaultFoods, action) {
  switch (action.type) {
    case GET_FOODS:
      return action.foods
    default:
      return state
  }
}
