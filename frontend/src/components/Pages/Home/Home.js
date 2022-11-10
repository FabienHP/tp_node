import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useEffect, useState } from 'react';

export default function Home() {
  const [postList, setPostList] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND}/posts`)
      .then(res => res.json())
      .then(res => setPostList(res))
  }, [])

  return (
    <Container component="main" sx={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 3 }}>
      <Typography variant="h3" gutterBottom>
        Post list
      </Typography>
      <Stack spacing={4} sx={{ width: "100%" }}>
        {postList && postList.map(post => (
          <Paper
            sx={{
              color: "color.secondary",
              height: "fit-content",
              padding: 2,
              width: "100%"
            }}
            elevation={3}
          >
            {post.title}
          </Paper>
        ))}
      </Stack>
    </Container>
  );
}
