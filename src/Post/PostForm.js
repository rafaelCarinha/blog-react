import React, {Component} from 'react';

class PostForm extends Component {
    constructor(props) {
        super(props);
        this.state = {name: '', tittle: '', content: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name] : event.target.value });
    }

    handleSubmit(event) {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state)
        };

        fetch('/api/v1/post/create', requestOptions)
            .then(function(response) {
            console.log(response)
            return response.json();
        });

        alert('A new Blog Post was submitted: ' + this.state.name);

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
                    Tittle:
                    <input type="text" value={this.state.tittle} name="tittle" onChange={this.handleChange} />
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