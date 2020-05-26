import React, {Component} from 'react';
import Posts from './Posts';
import { config } from '../constants'
const url = config.url.API_URL

class PostList extends Component {
    render() {
        return (
            <Posts posts={this.state.posts} />
        )
    }

    state = {
        posts: []
    };

    componentDidMount() {
        fetch(url+'/api/v1/post/listAll', { credentials: 'include' })
            .then(res => res.json())
            .then((data) => {
                this.setState({ posts: data })
            })
            .catch(console.log)
    }
}

export default PostList;