import { combineReducers } from 'redux';
import postReducers from './post';
import userReducers from './user';
export default combineReducers({
	posts: postReducers,
	users: userReducers
});
