import React, {Component} from 'react';
import { config } from '../constants'
import { Editor } from '@tinymce/tinymce-react';
import "./Post.css";
import * as QueryString from "query-string"

const url = config.url.API_URL;
const updateUrl = config.url.API_URL+'/api/v1/post/update';

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
    }

    handleSubmit(event) {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state)
        };

        fetch(updateUrl, requestOptions)
            .then(async response => {
                const data = await response.json();

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                } else {
                    alert('Blog Post Updated: ' + this.state.name);
                }

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
                <form onSubmit={this.handleSubmit}>
                <div className="Fixed">
                </div>
                <div className="lander">
                    <label>
                        Id: {this.state.id}
                    </label>
                    <input type="hidden" value={this.state.id} name="id" onChange={this.handleChange}/>
                    <label>
                        Name:
                    </label>
                    <input type="text" value={this.state.name} name="name" onChange={this.handleChange}/>
                    <label>
                        Title:
                    </label>
                    <input type="text" value={this.state.title} name="title" onChange={this.handleChange} />
                    <input type="hidden" value={this.state.content} name="content" onChange={this.handleChange}/>
                    <label>
                        Content:
                    </label>
                </div>
                <div className="editor">
                    <Editor apiKey='h5emgghd607rtvcqj2iwnys2deuo08p3af08yx9dahq9l3e4'
                            initialValue={this.state.content}
                            value={this.state.content}
                            init={{
                                height: 500,
                                menubar: false,
                                branding: false,
                                autoresize_on_init: false,
                                plugins: [
                                    'advlist autolink lists link image charmap print preview anchor',
                                    'searchreplace visualblocks code fullscreen',
                                    'insertdatetime media table paste code help wordcount',
                                ],
                                toolbar:
                                    'undo redo | formatselect | bold italic backcolor | \
                                    alignleft aligncenter alignright alignjustify | \
                                    bullist numlist outdent indent | removeformat | help ',
                                toolbar_location: 'top',
                            }}
                            onEditorChange={this.handleEditorChange}
                    />
                </div>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default ViewPost;