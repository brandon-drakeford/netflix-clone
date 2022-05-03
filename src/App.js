import React, { useEffect } from 'react';
import { Home, Login, Profile } from './components/screens';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { auth } from "./firebase";
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';
import './css/App.css';
import MessageContainer from './components/common/MessageContainer';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
   const unsubscribe =  auth.onAuthStateChanged(userAuth => {
      if (userAuth) {
        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email
        }))
      } else {
        dispatch(logout());
      }
    })

    return unsubscribe;
  }, [dispatch])
  
  return (
    <div className="App">
        {!user.user ? (
                <Login />
        ) : (
          <Router>
            <Routes>
              <Route exact path="/" element={<Home />} />
              {/* <Route exact path="/" element={typeof user.subscription?.role === 'undefined' ? (<Navigate replace to="/profile" />) : (<Home />)} /> */}
              <Route exact path="/profile" element={<Profile user={user} />} /> 
            </Routes>
          </Router>
        )}

        <MessageContainer />
    </div>
  );
}

export default App;
