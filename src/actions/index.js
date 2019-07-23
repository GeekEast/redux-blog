import axios from 'axios';

// thunk way
export const fetchPosts = () => async (dispatch, getState) => {
	// bad approach
	const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts');
	dispatch({ type: 'FETCH_POSTS', payload: data });
};
