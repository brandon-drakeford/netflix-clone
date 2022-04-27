import React from 'react';
import { auth } from '../../firebase';
import NavBar from '../NavBar';
import Plans from './Plans';
import '../../css/Profile.css';

function Profile({ user }) {

  return (
    <div className='profileScreen'>
        <NavBar />

        <div className="profileScreen__body">
            <h1>Edit Profile</h1>

            <div className='profileScreen__info'>
                <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png?20201013161117"
                    alt="User Avatar Logo" />

                <div className='profileScreen__details'>
                    <h2>{user.user?.email}</h2>
                    
                    <div className='profileScreen__plans'>
                        <h3>Plans</h3>

                        <Plans user={user} />

                        <button 
                            onClick={() => auth.signOut()}
                            className='profileScreen__signOut'>Sign Out</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Profile