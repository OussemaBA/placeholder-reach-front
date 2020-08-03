import { CHANGE_DIR } from '../actions/types';

const intialstate = {
  direction: 'ltr'
};

export default function(state = intialstate, action) {
  switch (action.type) {
    case CHANGE_DIR:
      return { ...state, direction: action.payload };

    default:
      return state;
  }
}
