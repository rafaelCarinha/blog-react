import React, {Component} from 'react';
import { config } from '../constants'

const url = config.url.API_URL+'/api/v1/post/create';

class PostForm extends Component {

    constructor(props) {
        super(props);
        this.state = {name: '', title: '', content: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name] : event.target.value });
    }

    handleSubmit(event) {
        alert(url)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state)
        };

        fetch(url, requestOptions)
            .then(async response => {
                const data = await response.json();

                // check for error response
                if (!response.ok) {
                    alert('Error Alert: '+url);
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                } else {
                    alert('A new Blog Post was submitted: ' + this.state.name);
                }

                //this.setState({ postId: data.id })
            })
            .catch(error => {
                this.setState({ errorMessage: error.toString() });
                alert('Catch Error Alert: '+error);
                console.error('There was an error!', error);
        });

        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={this.state.name} name="name" onChange={this.handleChange} />
                </label>
                <label>
                    Title:
                    <input type="text" value={this.state.title} name="title" onChange={this.handleChange} />
                </label>
                <label>
                    Content:
                    <input type="text" value={this.state.content} name="content" onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default PostForm;