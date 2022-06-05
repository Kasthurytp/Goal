import React from 'react'
import './Post.css'
import { Avatar } from '@mui/material';


function Post({username, caption, imageUrl}) {
  return (
    <div className='post'>
        <div className="postHeader">
            <Avatar className='postAvatar' alt="Kasthury" src="/static/images/avatar/1.jpg" />
            <h3 className='username'>{username}</h3>
        </div>
        
    
        <img className='postImage' src={imageUrl}/>
 
        <h4 className='postText'><strong> {username} </strong>{caption}</h4>
  
    </div>
  )
}

export default Post