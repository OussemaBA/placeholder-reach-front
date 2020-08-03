import {
  CHANGE_LANG,
  CHANGE_DIR,
  FETCH_GROUPS,
  FETCH_MODERATORS,
  FETCH_PARTICIPANTS,
  FETCH_DISCUSSIONS
} from './types';
import axios from 'axios';
import { Api } from '../config/constants';
export const setMenuList = (type, payload) => ({ type, payload });

export function changeLanguage(lang) {
  return {
    type: CHANGE_LANG,
    payload: lang
  };
}

export function changeDirection(dir) {
  return {
    type: CHANGE_DIR,
    payload: dir
  };
}
export const fetchGroups = () => async dispatch => {
  const res = await axios.get(`${Api.baseURL}/listgroups`);
  dispatch({ type: FETCH_GROUPS, payload: res.data });
};

export const fetchModerators = () => async dispatch => {
  const res = await axios.get(`${Api.baseURL}/listmoderators`);
  dispatch({ type: FETCH_MODERATORS, payload: res.data });
};

export const fetchParticipants = () => async dispatch => {
  const res = await axios.get(`${Api.baseURL}/listparticipants`);

  dispatch({ type: FETCH_PARTICIPANTS, payload: res.data });
};

export const fetchDiscussions = () => async dispatch => {
  const res = await axios.get(`${Api.baseURL}/listdiscussions`);

  dispatch({ type: FETCH_DISCUSSIONS, payload: res.data });
};
