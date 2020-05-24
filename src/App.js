import React, {Component} from 'react';
import Posts from './components/posts';

class App extends Component {
    render() {
        return (
            <Posts posts={this.state.posts} />
        )
    }

    state = {
        posts: []
    };

    componentDidMount() {
        fetch('/api/v1/post/listAll')
            .then(res => res.json())
            .then((data) => {
                this.setState({ posts: data })
            })
            .catch(console.log)
    }
}

export default App;