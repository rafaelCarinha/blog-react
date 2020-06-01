import React from 'react'
import "./Post.css";

const Posts = ({posts}) => {
    return (
        <div className="Post">
            <div className="lander">
                <center><h1>Blog Post List</h1></center>
                {posts.map((post, index) => (
                    <div className="card" key={index}>
                        <div className="card-body">
                            <a href={'/ViewPost?id='+post.id}>{post.title}</a>
                            <h4 className="card-title">Comments:</h4>
                            {post.comments.map((comment) => (
                                <div>
                                    <p className="card-text">{comment.comment}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>

    )
};

export default Posts