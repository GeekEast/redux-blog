import React from 'react';
import { fetchPosts } from '../actions';
import { connect } from 'react-redux';

class PostList extends React.Component {
	componentDidMount() {
		// you must call this.props.fetchPosts() rather than just fetchPosts
		this.props.fetchPosts();
	}
	render() {
		const { posts } = this.props;
		if (!posts || posts.length === 0) {
			return <div>Post List</div>;
		}
		return (
			<div>
				{this.props.posts.map((post) => {
					return <div key={post.id}>{post.title}</div>;
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
