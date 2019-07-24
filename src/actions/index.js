import axios from 'axios';
import _ from 'lodash';

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
	// anyway the last one in the chain should be an action object.
	await dispatch(fetchPosts());
	_.chain(getState().posts).map('userId').uniq().forEach((id) => dispatch(fetchUser(id))).value();
};

// thunk way - to pass a function which will be triggerred before arriving redux store.
export const fetchPosts = () => async (dispatch) => {
	// good practice
	const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts');
	dispatch({ type: 'FETCH_POSTS', payload: data });
};

// thunk way with memoize
export const fetchUser = (id) => (dispatch) => {
	_fetchUser(id, dispatch);
};
// private function: you don't want others to use it.
const _fetchUser = _.memoize(async (id, dispatch) => {
	const { data } = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
	dispatch({ type: 'FETCH_USER', payload: data });
});
