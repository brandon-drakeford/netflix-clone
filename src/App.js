import React, { useEffect } from 'react';
import './css/App.css';
import { Home, Login, Profile } from './components/screens';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { auth } from "./firebase";
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
   const unsubcribe =  auth.onAuthStateChanged(userAuth => {
      if (userAuth) {
        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email
        }))
      } else {
        dispatch(logout());
      }
    })

    return unsubcribe;
  }, [dispatch])
  return (
    <div className="App">
       {!user ? (
              <Login />
        ) : (
          <Router>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/profile" element={<Profile />} /> 
            </Routes>
          </Router>
        )}
    </div>
  );
}

export default App;
