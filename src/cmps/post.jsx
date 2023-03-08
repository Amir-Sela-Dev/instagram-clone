import { Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { useEffect, useState } from 'react';
import { db, firebase } from '../firebase';

export function Post({ username, user, caption, imgUrl, postId }) {
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState('')

    useEffect(() => {
        let unsubscribe
        if (postId) {
            unsubscribe = db
                .collection('post')
                .doc(postId)
                .collection('comments')
                .orderBy('timestamp', 'desc')
                .onSnapshot((snapshot) => {
                    setComments(snapshot.docs.map((doc) => doc.data()))
                })
        }
        return () => {
            unsubscribe()
        }
    }, [postId])

    console.log(comments);
    function postComment(ev) {
        ev.preventDefault()
        db.collection('post').doc(postId).collection('comments').add({
            text: comment,
            username: user.multiFactor.user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()

        })
        setComment('')
    }

    const heart = "../assets/img/heart.svg"
    return (
        <div className="post">
            <div className="post-header">
                <Avatar className='avatar' alt={username} src="/static/images/avatar/1.jpg" />
                <h3>{username}</h3>
            </div>
            <img src={imgUrl} alt="" />
            <div className="icons flex">
                <img src='https://res.cloudinary.com/dp3tok7wg/image/upload/v1678284295/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGFyaWEtbGFiZWw9Ikxpa2UiIGNsYXNzPSJfYWI2LSIgY29sb3I9InJnYigxNDIsIDE0MiwgMTQyKSIgZmlsbD0icmdiKDE0MiwgMTQyLCAxNDIpIiBoZWlnaHQ9IjI0IiByb2xlPSJpbWciIHZ_e9i8th.svg' alt="" />
                <img src="https://res.cloudinary.com/dp3tok7wg/image/upload/v1678284290/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGFyaWEtbGFiZWw9IkNvbW1lbnQiIGNsYXNzPSJfYWI2LSIgY29sb3I9InJnYigxNDIsIDE0MiwgMTQyKSIgZmlsbD0icmdiKDE0MiwgMTQyLCAxNDIpIiBoZWlnaHQ9IjI0IiByb2xlPSJpbWc_epiy0g.svg" alt="" />
                <img src="https://res.cloudinary.com/dp3tok7wg/image/upload/v1678284283/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGFyaWEtbGFiZWw9IlNoYXJlIFBvc3QiIGNsYXNzPSJfYWI2LSIgY29sb3I9InJnYigxNDIsIDE0MiwgMTQyKSIgZmlsbD0icmdiKDE0MiwgMTQyLCAxNDIpIiBoZWlnaHQ9IjI0IiByb2xlPSJ_fbqtsg.svg" alt="" />
            </div>
            <h4 className="post-text"> <strong>{username} </strong>{caption}</h4>

            <h5>View all {comments.length} comments</h5>
            <div className="post-comments">
                {comments.map((comment, i) => {
                    return <p key={i} className='comment'>
                        <b>{comment.username} </b> {comment.text}
                    </p>
                })}
            </div>
            {user && <form className='flex' >
                <input type="text"
                    placeholder='Add a comment...'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />

                <Button className='button' disabled={!comment} type={'submit'} onClick={postComment}>
                    Post
                </Button>
            </form>
            }        </div>
    )
}