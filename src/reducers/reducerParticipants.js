import { FETCH_PARTICIPANTS } from '../actions/types';

const intialstate = {
  participants: []
};

export default function(state = intialstate, action) {
  switch (action.type) {
    case FETCH_PARTICIPANTS:
      return { ...state, participants: action.payload };
    default:
      return state;
  }
}
