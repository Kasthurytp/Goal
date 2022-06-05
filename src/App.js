import * as React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import Post from './Post/Post';
import {auth, db} from './firebase';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ImageUpload from './ImageUpload/ImageUpload';

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

function App() {
  
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [posts, setPosts] = useState([]);

  const [openSignIn, setOpenSignIn] = useState(false);
  const [email, setEmail] =useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() =>{
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      //if user has logged in
      if(authUser){
        console.log(authUser);
        setUser(authUser);
      }else{
        setUser(null);
      }
    })

    return () => {
      unsubscribe();
    }
  },[user, username]);

  useEffect(() =>{
    db.collection('post').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })))
    })
  }, []);


  const signUp = (event) => {
      event.preventDefault();

      auth.createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        })
      })
      .catch((error) => alert(error.message))

      setOpen(false);
  }


  const signIn = (event) => {
    event.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message))

    setOpenSignIn(false);
  }


  return (
    <div className="App">
      
      {user?.displayName ? (
        <ImageUpload username={user.displayName} />
      ):(
        <h3>Sorry you need to login to upload</h3>
      )
      }
  
     
      {/* create pop up */}
      <div>
        {user ? (
          <Button onClick={() => auth.signOut()}>Log out</Button>
        ): (
          <div className='loginContainer'>
              <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
              <Button onClick={() => setOpen(true)}>Sign Up</Button>
          </div>
        )}
      
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={() => setOpen(false)}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
        <center>
          <form className='appSignup'>
              <Fade in={open}>
                <Box sx={style}>
                  <Typography id="transition-modal-title" variant="h6" component="h2">
                    Sign up
                  </Typography>

                  <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                    <input 
                    className='input'
                    placeholder='username'
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    />
                  </Typography>

                  <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                    <input 
                    className='input'
                    placeholder='email'
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                  </Typography>

                  <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                    <input 
                    className='inputPassword'
                    placeholder='password'
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                  </Typography>

                  <Typography>
                    <Button type="submit" onClick={signUp} className="signupButton" variant="outlined"> SIGN UP </Button>
                  </Typography>

                </Box>
              </Fade>
            </form>
        </center>
      </Modal>


      <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={openSignIn}
          onClose={() => setOpenSignIn(false)}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
        <center>
          <form className='appSignup'>
              <Fade in={openSignIn}>
                <Box sx={style}>
                  <Typography id="transition-modal-title" variant="h6" component="h2">
                    Sign In
                  </Typography>

                  <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                    <input 
                    className='input'
                    placeholder='email'
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                  </Typography>

                  <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                    <input 
                    className='inputPassword'
                    placeholder='password'
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                  </Typography>

                  <Typography>
                    <Button type="submit" onClick={signIn} className="signupButton" variant="outlined"> SIGN IN </Button>
                  </Typography>

                </Box>
              </Fade>
            </form>
        </center>
      </Modal>

    </div>


      <div className="appHeader">
        <img className="appHeaderImage" src= "https://res.cloudinary.com/do9kzlzo0/image/upload/v1654328115/Goal/images_mniwgn.jpg"/>
      </div>

      <h1>Platform for workers</h1>

      {
        posts.map(({id, post}) => (
          <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
        ))
      }

    </div>
  );
}

export default App;
