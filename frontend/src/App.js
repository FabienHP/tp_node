import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Navigate, Route, Routes } from 'react-router-dom';
import AppBarNav from './components/AppBar';
import { AuthProvider } from './components/auth/authState';
import RequireAuth from './components/auth/RequireAuth';
import Home from './components/Pages/Home/Home';
import PostPage from './components/Pages/Post/PostPage';
import Signin from './components/Pages/Sign/Signin';
import Signup from './components/Pages/Sign/Signup';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <CssBaseline />
        <AppBarNav />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/postApost' element={<RequireAuth><PostPage /></RequireAuth>} />
          <Route path='*' element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </ThemeProvider >
  );
}

export default App;
