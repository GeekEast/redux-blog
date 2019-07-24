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

### Memoization
- is a way to cache `function`
- There are many ways to cache.
  
| Name           | Time              | Where  |
| -------------- | ----------------- | ------ |
| Function cache | at the same time  | Local  |
| HTTP cache     | at different time | Server |

#### Entrance
```javascript
function getUser(id) {
    fetch(id);
    return "Made a request!"
}
const memoizedGetUser = _.memoize(getUser);
memoizedGetUser(3);
```

#### Wrong!
- same id, same function, rather than the action itself!
- so same request will still be called multiple times.
```javascript
const fetchUser = _.memoize((id)=>(dispatch)=>{
    const response = await ...id;
    dispatch(...);
})
```

#### Wrong Again!
- everytime we call fetchUser, we create a new function.
```javascript
const fetchUser = (id) => _.memoize(async (dispatch) => {
    const reponse = await ...id;
    dispatch(...);
})
```

#### Right!!!
```javascript
// private functions you don't want other programmer to modify
const _fetchUser = _.memoize(async (id, dispatch) => {
    const response = await ...id;
    dispatch(...);
})
const fetchUser = id => dispatch => {
    _fetchUser(id, dispatch);
}
```

#### The simpler way even doesn't work ....
```javascript
export const fetchUser = (id) => (dispatch) =>
	_.memoize(async (id, dispatch) => {
		const { data } = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
		dispatch({ type: 'FETCH_USER', payload: data });
	})(id, dispatch);
```

#### Conclusion @_@
- always make `_.memoize()` inside a wrapper function like `_fetchUser()` if you want to pass `parameters` into it.

### When do you need to use `await`?
- The current request depends on the response of last request.