import { get } from 'lodash';
import { API_URL } from '../helpers/api';

const INITIAL_STATE = {
  example_list: [],
};

const reducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_EXAMPLE':
      return {
        ...state,
        example_list: action.payload,
      };
    default:
      return state;
  }
};

export default reducers;
