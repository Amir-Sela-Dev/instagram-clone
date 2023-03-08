import { Button } from "@mui/material";
import { useState } from "react";
import { storage, db, firebase } from "../firebase";

export function ImgUploader({ username }) {
    const [caption, setCaption] = useState('')
    const [progress, setProgress] = useState(0)
    const [img, setImg] = useState('')

    function handleChange(ev) {
        if (ev.target.files[0]) {
            setImg(ev.target.files[0])
        }
    }

    function handleUpload() {
        const uploadTask = storage.ref(`images/${img.name}`).put(img)
        console.log(uploadTask);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                )
                setProgress(progress)
            },
            (err) => {
                console.log(err);
                alert(err.message)
            },
            () => {
                storage
                    .ref("images")
                    .child(img.name)
                    .getDownloadURL()
                    .then(url => {
                        console.log(url);
                        db.collection("post").add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            imgUrl: url,
                            username: username
                        })

                        setProgress(0)
                        setCaption('')
                        setImg(null)
                    })
            }
        )

    }

    return (
        <div className="img-uploader">
            <progress value={progress} max='100'> </progress>
            <input type="text" onChange={ev => setCaption(ev.target.value)} value={caption} />
            <input type="file" onChange={handleChange} />
            <Button onClick={handleUpload} >Upload</Button>
        </div>
    )

}