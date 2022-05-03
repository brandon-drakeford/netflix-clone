import React, { useState, useRef } from 'react'
import { authLogin, authRegister } from '../../firebase/auth';
import { validateForm } from '../Utilities';
import '../../css/SignUp.css';
import MessageContainer from '../common/MessageContainer';

function SignUp() {
    const [onSignUp, setOnSignUp] = useState(false);
    const [error, setError] = useState(null);
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const fullNameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    let fullNameError, emailError, passwordError;

    const register = (e) => {
        e.preventDefault();
        setIsAuthenticating(true);

        if (error) {
            setError(null);
        }
        
        fullNameError = validateForm(fullNameRef.current);
        emailError = validateForm(emailRef.current);
        passwordError = validateForm(passwordRef.current);

        if (fullNameError || emailError || passwordError) {
            return setIsAuthenticating(false);
        }

        handleErrors(fullNameError, emailError, passwordError);

        authRegister({ 
            email: emailRef.current.value, 
            password: passwordRef.current.value,
            fullName: fullNameRef.current.value
        });

        setIsAuthenticating(false);
    }

    const signIn = async (e) => {
        e.preventDefault();
        setIsAuthenticating(true);

        emailError = validateForm(emailRef.current);
        passwordError = validateForm(passwordRef.current);

        if (emailError || passwordError) {
            setIsAuthenticating(false);
        }

        handleErrors(emailError, passwordError);
        
       await authLogin({ 
            email: emailRef.current.value, 
            password: passwordRef.current.value
        });

        setIsAuthenticating(false);
    }

    const handleErrors = (fullName, email, password) => {
        if (fullName) {
            return setError(fullName)
        } else if (email) {
            return setError(email)
        } else if (password) {
            return setError(password)
        }
    }

    return (
        <div className={`${error ? 'login-error' : ''} signup`}signup>
            <form>
                <h1>{`${onSignUp ? 'Sign Up' : 'Sign In'}`}</h1>

                {error && (
                    <div className="signup__errorMessage">
                        {error}
                    </div>
                )}
                
                {onSignUp && (<input id="userFullName" ref={fullNameRef} placeholder='Full Name' type="text" />)}
                <input id="userEmail" ref={emailRef} placeholder='Email' type="email" />
                <input id="userPassword" ref={passwordRef} placeholder="Password" type="password" />

                <button className="signup__button"
                    type="submit" 
                    onClick={(e) => onSignUp ? register(e) : signIn(e) }>
                    {onSignUp ? 'Sign Up' : 'Sign In'}
                </button>

                <h4>
                    <span className='signup__gray'>{`${onSignUp ? 'Already have an account?' : 'New to Netflix?'} `}</span>

                    <span className='signup__link' onClick={() => setOnSignUp(!onSignUp)}>
                        {onSignUp ? 'Sign In Now' : 'Sign Up Now'}.
                    </span>
                </h4>
            </form>
        </div>
    )
}

export default SignUp