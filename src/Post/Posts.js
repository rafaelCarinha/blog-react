import React from 'react'

const Posts = ({posts}) => {
    return (
        <div>
            <center><h1>Blog Post List</h1></center>
            {posts.map((post) => (
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">{post.tittle}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">{post.content}</h6>
                        <h4 className="card-title">Comments:</h4>
                        {post.comments.map((comment) => (
                            <div>
                                <p class="card-text">{comment.comment}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
};

export default Posts