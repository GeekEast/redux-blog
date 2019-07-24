import React from 'react';
import { fetchPostsAndUsers } from '../actions';
import { connect } from 'react-redux';
import UserHeader from './UserHeader';

class PostList extends React.Component {
	componentDidMount() {
		// you must call this.props.fetchPosts() rather than just fetchPosts
		this.props.fetchPostsAndUsers();
	}

	render() {
		const { posts } = this.props;
		if (!posts || posts.length === 0) {
			return <div>Post List</div>;
		}
		return (
			<div className="ui relaxed divided list">
				{this.props.posts.map((post) => {
					return (
						<div className="item" key={post.id}>
							<i className="large middle aligned icon user" />
							<div className="content">
								<div className="description">
									<h2>{post.title}</h2>
									<p>{post.body}</p>
									<UserHeader authorId={post.userId} />
								</div>
							</div>
						</div>
					);
				})}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	console.log(state);
	const { posts } = state;
	return { posts };
};

export default connect(mapStateToProps, { fetchPostsAndUsers })(PostList);
