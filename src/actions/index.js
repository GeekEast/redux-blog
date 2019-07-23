import axios from 'axios';
export const fetchPosts = async () => {
	// bad approach
	const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts');
	const posts = data;
	return {
		type: 'FETCH_POSTS',
		payload: posts
	};
};
