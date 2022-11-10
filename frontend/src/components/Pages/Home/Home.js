import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useEffect, useState } from 'react';
import { useAuth } from '../../auth/authState';

export default function Home() {
  const auth = useAuth();
  const [postList, setPostList] = useState(null);

  useEffect(() => {
    if (auth.user) {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", auth.user.token);

      fetch(`${process.env.REACT_APP_BACKEND}/posts`, { headers: myHeaders })
        .then(res => res.json())
        .then(res => setPostList(res))
    } else {
      setPostList(null)
    }
  }, [auth])

  return (
    <Container component="main" sx={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 3 }}>
      <Typography variant="h3" gutterBottom>
        Post list
      </Typography>
      <Stack spacing={4} sx={{ width: "100%", mb: 5, textAlign: "center" }}>
        {postList && postList.length
          ? postList.map(post => (
            <Paper
              key={post._id}
              sx={{
                color: "secondary",
                height: "fit-content",
                padding: 2,
                width: "100%"
              }}
              elevation={3}
            >
              <Typography variant='h5' gutterBottom>
                {post.title}
              </Typography>
              <Typography component="div" variant='body1' gutterBottom sx={{ textAlign: "justify" }}>
                {post.content.split("\n").map((i, key) => {
                  return <p key={key}>{i}</p>;
                })}
              </Typography>
              <Typography variant='caption' color="secondary.dark">
                {new Date(post.created_at).toDateString()}
              </Typography>
            </Paper>
          ))
          : postList && !postList.length ? (
            <Typography variant='h5' color="error.dark">
              {"No post found"}
            </Typography>
          ) : (
            <Typography variant='h5' color="error.dark">
              {"Not connected"}
            </Typography>
          )}
      </Stack>
    </Container>
  );
}
