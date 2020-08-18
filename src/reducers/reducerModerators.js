import { FETCH_MODERATORS } from '../actions/types';

const intialstate = {
  moderators: []
};

export default function(state = intialstate, action) {
  switch (action.type) {
    case FETCH_MODERATORS:
      return { ...state, moderators: action.payload };
    default:
      return state;
  }
}
