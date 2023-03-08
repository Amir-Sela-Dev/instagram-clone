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
            username: username,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()

        })
        setComment('')
    }
    return (
        <div className="post">
            <div className="post-header">
                <Avatar className='avatar' alt={username} src="/static/images/avatar/1.jpg" />
                <h3>{username}</h3>
            </div>
            <img src={imgUrl} alt="" />
            <h4 className="post-text"> <strong>{username} </strong>{caption}</h4>

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