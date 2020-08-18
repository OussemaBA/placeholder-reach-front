import { FETCH_GROUPS } from '../actions/types';

const intialstate = {
  groups: []
};

export default function(state = intialstate, action) {
  switch (action.type) {
    case FETCH_GROUPS:
      return { ...state, groups: action.payload };
    default:
      return state;
  }
}
