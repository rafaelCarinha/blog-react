import React, {Component} from 'react';
import { config } from '../constants'
import { Editor } from '@tinymce/tinymce-react';
import "./Post.css";

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

    handleEditorChange = (editorContent, editor) => {
        this.setState({content: editorContent});
        //this.state.content = content;
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
            <div className="Post">
                <div className="lander">
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Name:
                        </label>
                        <input type="text" value={this.state.name} name="name" onChange={this.handleChange} />
                        <label>
                            Title:
                        </label>
                        <input type="text" value={this.state.title} name="title" onChange={this.handleChange} />
                        <input type="hidden" value={this.state.content} name="content" onChange={this.handleChange}/>
                        <label>
                            Content:
                        </label>
                        <Editor apiKey='h5emgghd607rtvcqj2iwnys2deuo08p3af08yx9dahq9l3e4'
                            initialValue=""
                            init={{
                                height: 500,
                                menubar: false,
                                branding: false,
                                plugins: [
                                    'advlist autolink lists link image charmap print preview anchor',
                                    'searchreplace visualblocks code fullscreen',
                                    'insertdatetime media table paste code help wordcount'
                                ],
                                toolbar:
                                    'undo redo | formatselect | bold italic backcolor | \
                                    alignleft aligncenter alignright alignjustify | \
                                    bullist numlist outdent indent | removeformat | help'
                            }}
                            onEditorChange={this.handleEditorChange}
                        />
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        );
    }
}

export default PostForm;