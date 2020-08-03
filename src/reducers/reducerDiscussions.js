import { FETCH_DISCUSSIONS } from '../actions/types';

const intialstate = {
  discussions: []
};

export default function(state = intialstate, action) {
  switch (action.type) {
    case FETCH_DISCUSSIONS:
      return { ...state, discussions: action.payload };
    default:
      return state;
  }
}
