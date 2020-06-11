import { combineReducers } from 'redux';
import user from './user_reducer';

//여러가지 reducer들을 합쳐주기 위해 필요한 것
const rootReducer = combineReducers({
  user,
});

export default rootReducer;
