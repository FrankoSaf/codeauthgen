
import './mainStyles.css';
import axios from 'axios';
import { useContext, useEffect } from 'react';
import { Context } from './store/Context';
import { Routes, Route } from 'react-router-dom';
import NavBar from './pages/main/navigationMenu/NavigationMenu';
import MainDashBoard from './pages/main/mainDashboard/MainDashBoard';
import Register from './pages/authentication/auth_components/Register';
import Login from './pages/authentication/auth_components/LogIn';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/main/Home';
import Profile from './pages/profile/Profile';
import InputForm from './pages/main/mainDashboard/EditorForm';
import PasswordChange from './pages/authentication/auth_components/PasswordChange';
import SetNewPassword from './pages/authentication/auth_components/SetNewPassword';
import Documentation from './pages/main/Docs/Documentation';
import { baseUrl } from './assets/api/api';
import Contact from './pages/main/Contact';



function App() {
  const { setUser, isLoggedIn, setIsLoggedIn, darkTheme } =
    useContext(Context);

  useEffect(() => {
    (async () => {
      try {
        const result = await axios.get(`${baseUrl}/authentication/login`);
        if (result.data.isLoggedIn) {
          setUser(result.data.user);
          setIsLoggedIn(true);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  useEffect(() => {
    if (darkTheme) {
      document.body.style.backgroundColor = "#1e1e1e";
    } else {
      document.body.style.backgroundColor = "white";
    }
  }, [darkTheme]);

  return (
    <>
      <NavBar />

      <main>
        <Routes>
          {isLoggedIn && (
            <>
              {" "}
              <Route path="/profile" element={<Profile />} />
              {/* <Route path='/profile/:userId' element={<Profile />} /> */}
            </>
          )}
          <Route path="/dashboard" element={<MainDashBoard />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/passwordchange" element={<PasswordChange />} />
          <Route path="/user/setNewPassword/:id" element={<SetNewPassword />} />
          <Route path="/login" element={<Login />} />
          <Route path="/editor" element={<InputForm />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </>
  );
}

export default App;

// STYLED COMPONENTS
