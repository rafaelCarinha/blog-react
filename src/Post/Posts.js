import React from 'react'

const Posts = ({posts}) => {
    return (
        <div>
            <center><h1>Blog Post List</h1></center>
            {posts.map((post, index) => (
                <div className="card" key={index}>
                    <div className="card-body">
                        <h5 className="card-title">{post.title}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{post.content}</h6>
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
    )
};

export default Posts