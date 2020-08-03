import { CHANGE_LANG } from '../actions/types';

const intialstate = {
  language: 'en'
};

export default function(state = intialstate, action) {
  switch (action.type) {
    case CHANGE_LANG:
      return { ...state, language: action.payload };
    default:
      return state;
  }
}
