## Question
1. How to make asynchronous call in Redux React App?
   - the asynchronous request should be called within the `action creator` in the `componentDidMount()`
2. I did call the asynchronous request call in action creator, but there two bugs: a. action should be plain objects b. use middleware. What's the reason?
   - a. `async` will let the action creator return sth not a plain object. Debug to use `babeljs.io`
   - b. using `promise` will also not solve the problem because you have not got the data before dispatching it to store.
### Bad Practice
```javascript
export const fetchPosts = async () => {
	// bad approach
	const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts');
    const posts = data;
    
    // this is not the compiled code, go to babeljs.io
    // doesn't return a plain object because of the `async` 
	return {
		type: 'FETCH_POSTS',
		payload: posts
	};
};
```
3. What's the right way to do the asynchorous call?
   - use Middleware like Redux Thunk
### Middleware Way
- Middleware allows your action creator to return a `function` or an `action`
- If you return a `function` by an action creator, the middleware will automatically call the function
- If you return an `action`, it acts like the middleware doesn't do anything.
- Thunk is used to do asynchronous call before the action is arrived at store.
```javascript
// thunk way
export const fetchPosts = () => async (dispatch, getState) => {
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts');
    // manually dispatch to store after get right data
	dispatch({ type: 'FETCH_POSTS', payload: data });
};
```

### What is middleware?
- Middleware is added between `reducers` and `dispatch()`
- could `STOP`, `MODIFY` actions
- Redux-thunk is a middleware to deal with async issues of React.