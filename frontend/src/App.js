import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './components/auth/authState';
import Home from './components/Pages/Home/Home';
import Signin from './components/Pages/Sign/Signin';
import Signup from './components/Pages/Sign/Signup';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='*' element={<Navigate to="/" />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
