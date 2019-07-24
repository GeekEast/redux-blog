import React from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../actions';

class UserHeader extends React.Component {
	render() {
		// console.log(this.props.user);
		const { user } = this.props;
		if (!user) {
			return <div>Loading</div>;
		}
		return (
			<div>
				<h3>{user.name}</h3>
			</div>
		);
	}
}

// filter only on state from redux store, doesn't affect the props from parent component
const mapStateToProps = (state, ownProps) => {
	const { users } = state;
	const user = (users && users.find((user) => user.id === ownProps.authorId)) || null;
	return { user };
};

export default connect(mapStateToProps, { fetchUser })(UserHeader);
