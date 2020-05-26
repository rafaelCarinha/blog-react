import React from 'react'

const Contacts = ({contacts}) => {
    return (
        <div>
            <center><h1>Contact List</h1></center>
            {contacts.map((contact) => (
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">{contact.name}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">{contact.title}</h6>
                        {contact.comments.map((comment) => (
                            <div>
                                <h5 className="card-title">Comment</h5>
                                <p class="card-text">{comment.comment}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
};

export default Contacts