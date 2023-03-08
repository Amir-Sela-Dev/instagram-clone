import { useEffect, useState } from "react";
import { Post } from "../cmps/post";
import { db, auth } from "../firebase";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button, Input } from "@mui/material";


export function InstagramIndex({ handleClose, open, setOpen, user, setUser, openSignIn, setOpenSignIn }) {
    const [posts, setPosts] = useState([])
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        db.collection('post').onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => ({
                id: doc.id,
                post: doc.data()
            })))
        })
    }, [])

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(authUser => {
            if (authUser) {
                console.log(authUser);
                setUser(authUser)
            } else {
                setUser(null)
            }
        })

        return () => {
            unsubscribe()
        }
    }, [user, username])

    function signup(ev) {
        ev.preventDefault()
        auth.createUserWithEmailAndPassword(email, password)
            .then(authUser => {
                return authUser.user.updateProfile({
                    displayName: username
                })

            })
            .catch(err => alert(err.message))

        setOpen(false)
    }
    function signIn(ev) {
        ev.preventDefault()
        auth.signInWithEmailAndPassword(email, password)
            .then(authUser => {
                return authUser.user.updateProfile({
                    displayName: username
                })
            })
            .catch(err => alert(err.message))

        setOpenSignIn(false)
    }


    const style = {
        position: 'absolute',
        top: '50%',

        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return (
        <div className="instagram-index">
            {
                posts.map(({ post, id }) => <Post key={id} username={post.username} caption={post.caption} imgUrl={post.imgUrl} />
                )
            }


            <Modal
                open={open}
                onClose={handleClose}
                className="modal"
            >
                <Box sx={style}>

                    <h2>Instagram</h2>

                    <form className="sign-up" >

                        <Input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        >
                        </Input>
                        <Input
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        >
                        </Input>
                        <Input
                            type="text"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        >
                        </Input>

                        <Button onClick={signup}>Sign up</Button>
                    </form>

                </Box>
            </Modal>
            <Modal
                open={openSignIn}
                onClose={() => setOpenSignIn(false)}
                className="modal"
            >
                <Box sx={style}>

                    <h2>Instagram</h2>

                    <form className="sign-up" >

                        <Input
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        >
                        </Input>
                        <Input
                            type="text"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        >
                        </Input>

                        <Button onClick={signIn}>Sign in</Button>
                    </form>

                </Box>
            </Modal>

        </div>
    )
}