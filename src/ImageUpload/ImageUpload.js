import { Button } from '@mui/material';
import React, { useState } from 'react'
import { db, storage } from '../firebase';
import { serverTimestamp } from "firebase/firestore"

function ImageUpload({username}) {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState('');

  const handleChange = (e) => {
      if(e.target.files[0]) {
          setImage(e.target.files[0]);
      }
  };

  const handleUpload = () => {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      
      uploadTask.on(
          "state_changed",
          snapshot => {
              const progress = Math.round(
                  (snapshot.bytesTransferred / snapshot.totalBytes)* 100
              );
              setProgress(progress);
          },
          (error) => {
              console.log(error);
              alert(error.message);
          },
          () => {
              storage
              .ref("images")
              .child (image.name)
              .getDownloadURL()
              .then(url => {
                  db.collection("post").add({
                      createdAt: serverTimestamp(),
                      caption: caption,
                      imageUrl : url,
                      username: username
                  });
                  setProgress(0);
                  setCaption("");
                  setImage(null);
              });
          }
      );
  };

  return (
    <div>
        <progress value={progress} max="100"/>
        <input type="text" placeholder="Enter the caption.." onChange={event => setCaption(event.target.value)} value={caption}/>
        <input type="file" onChange={handleChange}/>
        <Button onclick={handleUpload}>Upload</Button>
    </div>
  )
}

export default ImageUpload