import { combineReducers } from 'redux'; // Built-in func -> to keep the code clean comb. redus split into 2 smaller redus

import { SET_FILTER, SET_MOVIES, SET_USER } from '../actions/actions';

/* Each reducer takes a state and an action, and if it’s concerned by the action, it changes the state.
Reducers are pure functions; they only depend on their parameters, and they don't change anything. 
When concerned by the action, reducers simply return a new value. 
Reducers should never mutate the state but create a new instance of it - immutability 
Reducers: own realm built with prev state + an action passed as params
*/

function visibilityFilter(state = '', action) {   // signature, or identity card | action dispacted -> reducer called -> addresses the action (or not)
  switch (action.type) {  //  if the given action is unrelated to the reducer, then it should return whatever state it's been given 
    case SET_FILTER:  // (so if SET_FILTER was sg else)
      return action.value;
    default:  // A reducer must always return a state, even if there have been no changes 
      return state; // in which case, the reducer must accept and return the same, existing state
  }
}

function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.value;
    default:
      return state;
  }
}

function activeUser(state = [], action) {
  switch (action.type) {
    case SET_USER:
      return action.value;
    default:
      return state;
  }
}

/* Combined reducer - separating concerns
It groups all the reducers together and only passes them the state that they care about: 
the filter for the first reducer and the movies for the last one. */
/*
function moviesApp(state = {}, action) { 
  return {
    visibilityFilter: visibilityFilter(state.visibilityFilter, action),
    movies: movies(state.movies, action)
  }
}
*/

const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  activeUser
});

export default moviesApp;