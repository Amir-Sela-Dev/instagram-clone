import Avatar from '@mui/material/Avatar';
import { useState } from 'react';

export function Post({ username, caption, imgUrl }) {
    return (
        <div className="post">
            <div className="post-header">
                <Avatar className='avatar' alt={username} src="/static/images/avatar/1.jpg" />
                <h3>{username}</h3>
            </div>

            <img src={imgUrl} alt="" />

            <h4 className="post-text"> <strong>{username} </strong>{caption}</h4>

        </div>
    )
}