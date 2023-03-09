import { useEffect, useState } from "react";
import { Post } from "../cmps/post";
import { db, auth } from "../firebase";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button, Input } from "@mui/material";
import { ImgUploader } from "../cmps/imgUploader";
import { InstagramEmbed } from 'react-social-media-embed';

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
            <div className="post-list">

                <div className="lefr-posts">
                    {
                        posts.map(({ post, id }) => <Post key={id} user={user} postId={id} username={post.username} caption={post.caption} imgUrl={post.imgUrl} />
                        )
                    }
                </div>

                <div className="right-posts">
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <InstagramEmbed url="https://www.instagram.com/p/CpTeDXpMCHl/" width={328} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <InstagramEmbed url="https://www.instagram.com/p/Cot5huFgu7s/" width={328} />
                    </div>

                </div>
            </div>


            <Modal
                open={open}
                onClose={handleClose}
                className="modal"
            >
                <Box sx={style}>

                    <img src="https://res.cloudinary.com/dp3tok7wg/image/upload/v1678286839/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGFyaWEtbGFiZWw9Ikluc3RhZ3JhbSIgY2xhc3M9Il9hYjYtIiBjb2xvcj0icmdiKDM4LCAzOCwgMzgpIiBmaWxsPSJyZ2IoMzgsIDM4LCAzOCkiIGhlaWdodD0iMjkiIHJvbGU9ImltZyIgdml_ctovds.svg" alt="" />

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

                    <img src="https://res.cloudinary.com/dp3tok7wg/image/upload/v1678286839/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGFyaWEtbGFiZWw9Ikluc3RhZ3JhbSIgY2xhc3M9Il9hYjYtIiBjb2xvcj0icmdiKDM4LCAzOCwgMzgpIiBmaWxsPSJyZ2IoMzgsIDM4LCAzOCkiIGhlaWdodD0iMjkiIHJvbGU9ImltZyIgdml_ctovds.svg" alt="" />

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

            {user ? <ImgUploader username={user.multiFactor.user.displayName} user={user} />
                : <h3>Login to upload</h3>
            }

        </div>
    )
}