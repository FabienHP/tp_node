import { Navigate, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AuthProvider } from './components/auth/authState';
import Home from './components/Pages/Home/Home';
import Signin from './components/Pages/Sign/Signin';
import Signup from './components/Pages/Sign/Signup';
import AppBarNav from './components/AppBar';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <AppBarNav />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='*' element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </ThemeProvider >
  );
}

export default App;
