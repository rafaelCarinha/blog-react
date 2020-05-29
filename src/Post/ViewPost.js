import React, {Component} from 'react';
import { config } from '../constants'
import { Editor } from '@tinymce/tinymce-react';
import "./Post.css";
import * as QueryString from "query-string"
import history from "../history";
import {Button} from "react-bootstrap";

const url = config.url.API_URL;

class ViewPost extends Component {

    constructor(props) {
        super(props);
        this.state = {id: '', name: '', title: '', content: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const params = QueryString.parse(this.props.location.search);
        fetch(url+'/api/v1/post/findById?id='+params.id, { credentials: 'include' })
            .then(res => res.json())
            .then((data) => {
                this.setState({ id: data.id, name: data.name, title: data.title, content: data.content })
            })
            .catch(console.log)
    }

    handleChange(event) {
        this.setState({ [event.target.name] : event.target.value });
    }

    handleEditorChange = (editorContent, editor) => {
        this.setState({content: editorContent});
        console.log('Content was updated:', editorContent);
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

                this.props.history.push('/dashboard');
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
            <div className="Post">
                <div className="lander">
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Id: {this.state.id}
                        </label>
                        <input type="hidden" value={this.state.id} name="id" onChange={this.handleChange}/>
                        <label>
                            Name:
                        </label>
                        <input type="text" value={this.state.name} name="name" onChange={this.handleChange} readOnly={true}/>
                        <label>
                            Title:
                        </label>
                        <input type="text" value={this.state.title} name="title" onChange={this.handleChange} readOnly={true}/>
                        <input type="hidden" value={this.state.content} name="content" onChange={this.handleChange}/>
                        <label>
                            Content:
                        </label>
                        <Editor apiKey='h5emgghd607rtvcqj2iwnys2deuo08p3af08yx9dahq9l3e4' disabled={true}
                            initialValue={this.state.content}
                            init={{
                                height: 500,
                                menubar: false,
                                branding: false,
                                autoresize_on_init: true,
                                plugins: [
                                    'advlist autolink lists link image charmap print preview anchor',
                                    'searchreplace visualblocks code fullscreen',
                                    'insertdatetime media table paste code help wordcount',
                                    'autoresize'
                                ],
                                toolbar:
                                    'undo redo | formatselect | bold italic backcolor | \
                                    alignleft aligncenter alignright alignjustify | \
                                    bullist numlist outdent indent | removeformat | help'
                            }}
                            onEditorChange={this.handleEditorChange}
                        />
                        <Button variant="btn btn-success" onClick={() => history.push('/PostForm')}>Edit Blog Post.</Button>
                    </form>
                </div>
            </div>
        );
    }
}

export default ViewPost;