export default (users = [], action) => {
	switch (action.type) {
		case 'FETCH_USER':
			return reduce(users, action.payload);
		default:
			return users;
	}
};

const reduce = (arr, item) => {
	arr.forEach((curr) => {
		if (curr.id === item.id) {
			return arr;
		}
	});
	return [ ...arr, item ];
};
