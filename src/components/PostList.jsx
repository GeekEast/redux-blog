import React from 'react';
import { fetchPosts } from '../actions';
import { connect } from 'react-redux';

class PostList extends React.Component {
	componentDidMount() {
		this.props.fetchPosts();
		console.log(this.props);
	}
	render() {
		const { posts } = this.props;
		if (!posts) {
			return <div>Post List</div>;
		}
		return (
			<div>
				{this.props.posts.map((post) => {
					return <div>post.name</div>;
				})}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	const { posts } = state;
	return { posts };
};

export default connect(mapStateToProps, { fetchPosts })(PostList);
