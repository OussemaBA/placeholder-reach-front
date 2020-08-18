import { combineReducers } from 'redux';

import reducerLanguage from './reducerLanguage';
import reducerDirection from './reducerDirection';
import reducerGroups from './reducerGroups';
import reducerModerators from './reducerModerators';
import reducerParticipants from './reducerParticipants';
import reducerDiscussions from './reducerDiscussions';

export default combineReducers({
  language: reducerLanguage,
  direction: reducerDirection,
  groups: reducerGroups,
  moderators: reducerModerators,
  participants: reducerParticipants,
  discussions: reducerDiscussions
});
