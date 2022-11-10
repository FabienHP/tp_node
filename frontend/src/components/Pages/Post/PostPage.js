import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useAuth } from '../../auth/authState';

export default function PostPage() {
  const auth = useAuth();
  const [msgPost, setMsgPost] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsonData = {
      title: data.get('title'),
      content: data.get('content')
    }

    // Header
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", auth.user.token);
    myHeaders.append("Access-Control-Allow-Origin", "http://localhost:3001");

    // Request option
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(jsonData)
    };

    // Post
    fetch(`${process.env.REACT_APP_BACKEND}/posts`, requestOptions)
      .then(res => res.json())
      .then(res => res.message ? setMsgPost(res) : setMsgPost(res))
      .catch(error => console.log('error on post a post:', error));
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          New posts
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="title"
                label="Title"
                name="title"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                sx={{ "& .MuiInputBase-root": { minHeight: "100px" } }}
                required
                fullWidth
                multiline
                id="content"
                label="Content"
                name="content"
              />
            </Grid>
          </Grid>
          {msgPost ? msgPost.message ? (
            <Alert severity="error" sx={{ mt: 2 }}>
              {msgPost.message}
            </Alert>
          ) : (
            <Alert severity="success" sx={{ mt: 2 }}>
              {"Post successfully created"}
            </Alert>
          ) : null}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
          >
            Create a new post
          </Button>
        </Box>
      </Box>
    </Container>
  )
}
